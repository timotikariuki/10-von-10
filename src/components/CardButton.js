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
          <Image
            style={styles.logo}
            source={assetsPaths.images.category_logos[category]}></Image>
          <View style={styles.text_container}>
            <Text style={styles.text}>
              {
                [
                  'Ernste Fragen',
                  'Lustige Fragen',
                  'Unangenehme Fragen',
                  'Fangfragen',
                ][category]
              }
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexBasis: '50%',
    height: '50%',
    padding: 6,
  },
  l_container: {paddingLeft: 12},
  r_container: {paddingRight: 12},
  pressable: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: assetsPaths.colors.orange,
    borderWidth: 1,
    borderColor: "#888",
  },
  background: {
    position: 'relative',
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: '100%',
    resizeMode: 'contain',
    opacity: 0.5,
  },
  text_container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#00303f',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 36,
    textAlign: 'center',
    paddingTop: 24,
  },
});

export default CardButton;
