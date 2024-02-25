import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import assetsPaths from '../assetsPaths';

const TransparentButton = ({
  onPress,
  color = 'light',
  style: container_style,
  content = 'Spielanleitung',
}) => {
  return (
    <View style={container_style}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.pressable, color === 'dark' && styles.border_dark]}>
        <Text style={[styles.text, color === 'dark' && styles.border_dark]}>
          {content}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: assetsPaths.colors.orange,
    minHeight: 48,
    minWidth: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border_dark: {
    color: assetsPaths.colors.orange,
  },
  text: {
    color: assetsPaths.colors.orange,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
});

export default TransparentButton;
