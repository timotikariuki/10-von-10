import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import assetsPaths from '../assetsPaths';

const HelpButton = ({onPress, style: container_style}) => {
  return (
    <View style={container_style}>
      <TouchableOpacity onPress={onPress} style={styles.pressable}>
        <Text style={styles.text}>?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth:1,
    borderColor:assetsPaths.colors.white
  },
  text: {
    color: assetsPaths.colors.white,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HelpButton;
