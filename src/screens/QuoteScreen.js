import React from 'react';
import {View, Text, Button} from 'react-native';

function QuoteScreen({navigation}) {
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
        title="Home2"
        onPress={() => {  
          navigation.navigate('menu');
        }}></Button>
    </View>
  );
}

export default QuoteScreen;
