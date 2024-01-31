import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

import assetsPaths from '../assetsPaths';

function LogoTitle({navigation, route}) {
  const category = (route.params.category + 1) | 0;
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo_ring}>
        <Image
          style={styles.logo}
          source={
            category > 0
              ? assetsPaths.images.category_logos[category - 1]
              : assetsPaths.images.logo_black
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    backgroundColor: assetsPaths.colors.bright_blue,
    elevation: 5,
  },
  logo_ring: {
    position: 'absolute',
    top: 0,
    width: 100,
    height: 100,
    padding: 15,
    marginTop: 10,
    borderRadius: 80,
    backgroundColor: assetsPaths.colors.white,
    elevation: 5,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 80,
    resizeMode: 'contain',
  },
});

export default LogoTitle;
