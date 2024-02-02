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

const CardButton = ({onPress, backgroundImage, category, isLeft = 0}) => {
  return (
    <View
      style={[
        styles.container,
        isLeft === 0 ? styles.l_container : styles.r_container,
      ]}>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  l_container: {paddingLeft: 12},
  r_container: {paddingRight: 12},
  pressable: {
    width: 180,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
  },
  background: {
    paddingVertical: 24,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 100,
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
