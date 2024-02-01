import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import assetsPaths from '../assetsPaths';

const TransparentButton = ({
  onPress,
  color = 'light',
  style: container_style,
  content = '?',
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: assetsPaths.colors.white,
  },
  border_dark: {
    borderColor: 'transparent',
    backgroundColor: '#5d5f5fee',
    color: assetsPaths.colors.white,
  },
  text: {
    color: assetsPaths.colors.white,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TransparentButton;
