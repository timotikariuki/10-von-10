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

function LogoTitle({title}) {
  return (
    <View style={headerStyles.container}>
      <Image style={headerStyles.logo} source={assetsPaths.images.logo_black} />
      <Text style={headerStyles.title}>{title}</Text>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {width: 45, height: 45, marginTop: 5, resizeMode: 'contain'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
    marginLeft: 8,
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="menu"
        screenOptions={{
          headerStyle: {
            backgroundColor: assetsPaths.colors.dark_blue,
          },
          headerShadowVisible: true,
        }}>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{title: '10von10'}}
        />
        <Stack.Screen
          name="menu"
          component={MenuScreen}
          options={{
            headerTitle: props => <LogoTitle title={'10von10'} {...props} />,
          }}
        />
        <Stack.Screen
          name="quote"
          component={QuoteScreen}
          options={({route}) => ({
            headerTitle: `Kategorie ${route.params.category}`
            ,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
