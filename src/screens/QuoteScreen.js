import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import assetsPaths from '../assetsPaths';

function MenuScreen({navigation, route}) {
  const category = route.params.category - 1;

  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={
          [
            assetsPaths.images.card_green,
            assetsPaths.images.card_blue,
            assetsPaths.images.card_gray,
            assetsPaths.images.card_pink,
          ][category]
        }></Image>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: assetsPaths.colors.dark_blue,
    paddingVertical: 32,
  },
  background: {
    padding: 36,
    margin:2,
    borderRadius: 12,
    overflow: 'hidden',
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
export default MenuScreen;
