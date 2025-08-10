import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../themes/ThemeContext';

const FloatingActionButton = ({onPress}) => {
  const {theme} = useTheme();

  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Icon name="add" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const createStyles = (theme) => StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
});

export default FloatingActionButton;