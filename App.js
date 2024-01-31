/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import QuoteScreen from './src/screens/QuoteScreen';
import assetsPaths from './src/assetsPaths';

const Stack = createNativeStackNavigator();

function LogoTitle({navigation, route}) {
  const category = (route.params.category + 1) | 0;
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.logo_ring}>
        <Image
          style={headerStyles.logo}
          source={
            category > 0
              ? assetsPaths.images.category_logos[category - 1]
              : assetsPaths.images.logo_black
          }
        />
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    backgroundColor: assetsPaths.colors.white,
    elevation: 5,
  },
  logo_ring: {
    position: 'absolute',
    top: 0,
    width: 100,
    height: 100,
    padding: 15,
    marginTop: 10,
    borderRadius: 80,
    backgroundColor: assetsPaths.colors.white,
    elevation: 5,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 80,
    resizeMode: 'contain',
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="menu">
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="menu"
          component={MenuScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="quote"
          component={QuoteScreen}
          options={{header: props => <LogoTitle {...props} />}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
