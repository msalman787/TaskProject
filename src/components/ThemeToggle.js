import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useTheme} from '../themes/ThemeContext';

const ThemeToggle = () => {
  const {theme, themeMode, toggleTheme} = useTheme();

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme</Text>
      <RadioButton.Group onValueChange={toggleTheme} value={themeMode}>
        <View style={styles.option}>
          <Text style={styles.optionText}>System</Text>
          <RadioButton value="system" color={theme.colors.primary} />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Light</Text>
          <RadioButton value="light" color={theme.colors.primary} />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Dark</Text>
          <RadioButton value="dark" color={theme.colors.primary} />
        </View>
      </RadioButton.Group>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    color: theme.colors.text,
  },
});

export default ThemeToggle;