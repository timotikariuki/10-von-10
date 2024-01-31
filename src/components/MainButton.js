import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import assetsPaths from '../assetsPaths';

const MainButton = ({onPress, title, style: container_style}) => {
  return (
    <View style={container_style}>
      <TouchableOpacity onPress={onPress} style={styles.pressable}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: assetsPaths.colors.white,
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  text: {
    color: assetsPaths.colors.dark,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MainButton;
