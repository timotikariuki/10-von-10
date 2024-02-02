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
import NewQuoteScreen from './src/screens/NewQuoteScreen';
import OldQuoteScreen from './src/screens/OldQuoteScreen';

import {QuoteProvider} from './src/database/db.context';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <QuoteProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="menu"
          screenOptions={{
            animationDuration: 50,
            animation: 'slide_from_bottom',
          }}>
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
          
          <Stack.Screen
            name="old_quote"
            component={OldQuoteScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="new_quote"
            component={NewQuoteScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QuoteProvider>
  );
};

export default App;
