/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HelpScreen from './src/screens/HelpScreen';
import MenuScreen from './src/screens/MenuScreen';
import QuoteScreen from './src/screens/QuoteScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="menu">
        <Stack.Screen
          name="menu"
          component={MenuScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="quote"
          component={QuoteScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="help"
          component={HelpScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
