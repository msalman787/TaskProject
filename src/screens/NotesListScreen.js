import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NoteItem from '../components/NoteItem';
import FloatingActionButton from '../components/FloatingActionButton';
import DatabaseManager from '../database/database';
import {useTheme} from '../themes/ThemeContext';

const NotesListScreen = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const {theme} = useTheme();

  const styles = createStyles(theme);

  useEffect(() => {
    initDatabase();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const initDatabase = async () => {
    try {
      await DatabaseManager.initDB();
    } catch (error) {
      Alert.alert('Error', 'Failed to initialize database');
    }
  };

  const loadNotes = async () => {
    try {
      setLoading(true);
      const notesList = await DatabaseManager.getNotes();
      setNotes(notesList);
    } catch (error) {
      Alert.alert('Error', 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = (noteId) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await DatabaseManager.deleteNote(noteId);
              loadNotes();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete note');
            }
          },
        },
      ]
    );
  };

  const renderNote = ({item}) => (
    <NoteItem
      note={item}
      onPress={() => navigation.navigate('NoteDetail', {note: item})}
      onLongPress={() => handleDeleteNote(item.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="note" size={64} color={theme.colors.textSecondary} />
      <Text style={styles.emptyText}>No notes yet</Text>
      <Text style={styles.emptySubText}>Tap the + button to create your first note</Text>
    </View>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="settings" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, theme]);

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNote}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={notes.length === 0 ? styles.emptyList : styles.list}
        showsVerticalScrollIndicator={false}
      />
      <FloatingActionButton
        onPress={() => navigation.navigate('NoteDetail', {note: null})}
      />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    paddingVertical: 8,
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  settingsButton: {
    padding: 8,
    marginRight: 8,
  },
});

export default NotesListScreen;