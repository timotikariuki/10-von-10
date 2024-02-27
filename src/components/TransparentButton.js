import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import assetsPaths from '../assetsPaths';

const TransparentButton = ({
  onPress,
  color = 'light',
  style,
  content = 'Spielanleitung',
}) => {
  return (
    <View style={[color === 'dark' && styles.container_style, style]}>
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
  container_style: {
    position: 'absolute',
    top: 56,
    left: 20,
    zIndex: 99,
    backgroundColor: '#fffa',
  },
  pressable: {
    borderRadius: 4,
    overflow: 'hidden',
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
    borderColor: assetsPaths.colors.orange,
  },
  text: {
    color: assetsPaths.colors.orange,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
});

export default TransparentButton;
