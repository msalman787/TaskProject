import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatabaseManager from '../database/database';
import {useTheme} from '../themes/ThemeContext';

const NoteDetailScreen = ({route, navigation}) => {
  const {note} = route.params || {};
  const isEditing = !!note;
  
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [hasChanges, setHasChanges] = useState(false);
  
  const {theme} = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    const originalTitle = note?.title || '';
    const originalContent = note?.content || '';
    setHasChanges(title !== originalTitle || content !== originalContent);
  }, [title, content, note]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your note');
      return;
    }

    try {
      if (isEditing) {
        await DatabaseManager.updateNote(note.id, title.trim(), content.trim());
      } else {
        await DatabaseManager.addNote(title.trim(), content.trim());
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save note');
    }
  };

  const handleDelete = () => {
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
              await DatabaseManager.deleteNote(note.id);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete note');
            }
          },
        },
      ]
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          {isEditing && (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleDelete}
            >
              <Icon name="delete" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.headerButton, !hasChanges && styles.disabledButton]}
            onPress={handleSave}
            disabled={!hasChanges}
          >
            <Icon 
              name="save" 
              size={24} 
              color={hasChanges ? theme.colors.text : theme.colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, theme, hasChanges, isEditing]);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <TextInput
          style={styles.titleInput}
          placeholder="Note title..."
          placeholderTextColor={theme.colors.textSecondary}
          value={title}
          onChangeText={setTitle}
          fontSize={20}
          fontWeight="bold"
          maxLength={100}
        />
        <TextInput
          style={styles.contentInput}
          placeholder="Start writing..."
          placeholderTextColor={theme.colors.textSecondary}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          fontSize={16}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default NoteDetailScreen;