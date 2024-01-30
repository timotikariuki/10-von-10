import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import assetsPaths from '../assetsPaths';

const ImageButton = ({onPress, source, title}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.pressable}>
        <ImageBackground style={styles.background} source={source}>
          <Text style={styles.text}>{title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    flexBasis: '50%',
    backgroundColor: assetsPaths.colors.dark_blue,
    borderRadius: 2,
    borderColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor:"white"
  },
  background: {
    padding: 36,
    margin:2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  text: {
    color: assetsPaths.colors.dark_blue,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
  },
});

export default ImageButton;
