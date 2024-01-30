import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
} from 'react-native';
import assetsPaths from '../assetsPaths';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={assetsPaths.images.card_white}>
        <View style={styles.container}>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              navigation.navigate('menu');
              console.log('first');
            }}>
            <Image
              source={assetsPaths.images.logo_black}
              style={styles.logoImage}
            />
            <Text style={styles.text}>Herzlich willkommen bei 10von10</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    height: 320,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
  },
  pressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 65,
  },
  text: {
    color: 'black',
    width: 260,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
  },
});
export default HomeScreen;
