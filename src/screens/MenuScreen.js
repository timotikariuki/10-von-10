import React from 'react';
import {View, Text, Button} from 'react-native';

function MenuScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        height: 100,
        justifyContent: 'center',
      }}>
      <Text>Home Screen</Text>
      <Button
        title="Home"
        onPress={() => {
          navigation.navigate('home');
        }}></Button>
        <Button
          title="Quote"
          onPress={() => {
            navigation.navigate('quote');
          }}></Button>
    </View>
  );
}

export default MenuScreen;
