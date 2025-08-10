import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import {ThemeProvider} from './src/themes/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <PaperProvider>
          <StatusBar barStyle="default" />
          <AppNavigator />
        </PaperProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

