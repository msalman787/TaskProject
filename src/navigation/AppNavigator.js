import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotesListScreen from '../screens/NotesListScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {useTheme} from '../themes/ThemeContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {theme} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          color: theme.colors.text,
        },
      }}>
      <Stack.Screen 
        name="NotesList" 
        component={NotesListScreen}
        options={{title: 'My Notes'}}
      />
      <Stack.Screen 
        name="NoteDetail" 
        component={NoteDetailScreen}
        options={{title: 'Note'}}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;