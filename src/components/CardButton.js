import React from 'react';
import {
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import assetsPaths from '../assetsPaths';

const CardButton = ({onPress, backgroundImage, category}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.pressable}>
        <ImageBackground style={styles.background} source={backgroundImage}>
          <Text style={styles.text}>{`Kategorie ${category + 1}`}</Text>
          <Image
            style={styles.logo}
            source={assetsPaths.images.category_logos[category]}></Image>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexBasis: '50%',
    padding: 6,
  },
  pressable: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5
  },
  background: {
    paddingVertical: 48,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  logo: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
  },
  text: {
    color: '#00303f',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
  },
});

export default CardButton;
