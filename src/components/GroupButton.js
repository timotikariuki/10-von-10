import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import assetsPaths from '../assetsPaths';

const GroupButton = ({onPress, title, color = "blue",size="sm", style: container_style, disabled=false}) => {
  return (
    <View style={[container_style, size === "sm" && styles.sm, size === "lg" && styles.lg]}>
      <TouchableOpacity onPress={onPress} style={[styles.pressable, color === "orange" && styles.bg_orange, color === "transparent" && styles.bg_transparent, disabled && styles.disabled]} disabled={disabled} >
        <Text style={[styles.text, color === "transparent" && styles.bg_transparent]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: assetsPaths.colors.bright_blue,
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
  ,lg:{
    paddingHorizontal: 12,
    maxWidth: 240,
  },sm:{
  },
  bg_transparent:{
    backgroundColor: 'transparent',
    color: assetsPaths.colors.bright_blue,
  }
});

export default GroupButton;
