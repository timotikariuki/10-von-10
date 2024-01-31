import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import assetsPaths from '../assetsPaths';

const GroupButton = ({onPress, title, color = "blue", style: container_style, disabled=false}) => {
  return (
    <View style={container_style}>
      <TouchableOpacity onPress={onPress} style={[styles.pressable, color === "orange" && styles.bg_orange, disabled && styles.disabled]} disabled={disabled} >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: assetsPaths.colors.bright_blue,
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  text: {
    color: assetsPaths.colors.white,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bg_orange:{
    backgroundColor: assetsPaths.colors.orange
  },
  disabled:{
    backgroundColor: 'gray'
  }
});

export default GroupButton;
