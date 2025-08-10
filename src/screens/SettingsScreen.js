import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ThemeToggle from '../components/ThemeToggle';
import {useTheme} from '../themes/ThemeContext';

const SettingsScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <ThemeToggle />
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>About</Text>
          <Text style={styles.infoText}>
            Notes App v1.0{'\n'}
            Built with React Native and SQLite
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  infoContainer: {
    backgroundColor: theme.colors.card,
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
});

export default SettingsScreen;