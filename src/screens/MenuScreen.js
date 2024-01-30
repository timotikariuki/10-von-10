import React from 'react';
import {StyleSheet, View} from 'react-native';
import assetsPaths from '../assetsPaths';
import ImageButton from '../components/ImageButton';

function MenuScreen({navigation}) {
  const handlePress = category => {
    console.log('Button pressed!');
    navigation.navigate(`quote`, {category});
  };
  return (
    <View style={styles.container}>
      <View style={styles.button_container}>
      {[
        assetsPaths.images.card_green,
        assetsPaths.images.card_blue,
        assetsPaths.images.card_gray,
        assetsPaths.images.card_pink,
      ].map((image, idx) => (
        <ImageButton
          key={idx}
          onPress={() => {
            handlePress(idx + 1);
          }}
          source={image}
          title={`Kategorie ${idx + 1}`}
        />
      ))}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: assetsPaths.colors.dark_blue,
    paddingVertical: 32
  },
  button_container:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  text: {
    color: 'black',
    width: 260,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
  },
});
export default MenuScreen;
