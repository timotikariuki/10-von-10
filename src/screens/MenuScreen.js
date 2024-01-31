import React from 'react';
import {StyleSheet, View, Image, ImageBackground} from 'react-native';
import assetsPaths from '../assetsPaths';
import CardButton from '../components/CardButton';
import MainButton from '../components/QuoteButton';

function MenuScreen({navigation}) {
  const handlePress = category => {
    navigation.navigate('quote', {category});
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background_container}
        source={assetsPaths.images.background_1}></ImageBackground>
      <View style={styles.logo_container}>
        <View  style={styles.logo_ring}>
          <Image style={styles.logo} source={assetsPaths.images.logo_black} />
        </View>
      </View>
      <View style={styles.card_container}>
        {[
          assetsPaths.images.card_green,
          assetsPaths.images.card_blue,
          assetsPaths.images.card_gray,
          assetsPaths.images.card_pink,
        ].map((image, idx) => (
          <CardButton
            key={idx}
            onPress={() => {
              handlePress(idx);
            }}
            backgroundImage={image}
            category={idx}
          />
        ))}
      </View>

      <View style={styles.button_group}>
        <MainButton
          style={styles.group_botton}
          title="Zufallsmodus"
          onPress={() => {
            handlePress(Math.floor(Math.random() * 4));
          }}></MainButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background_container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 280,
    resizeMode: 'cover',
    backgroundColor: assetsPaths.colors.white,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: assetsPaths.colors.white,
    paddingVertical: 32,
  },
  logo_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logo_ring:{
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: assetsPaths.colors.white,
    elevation: 5,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  card_container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button_group: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  group_botton: {
    flexBasis: '50%',
    marginBottom: 36,
    paddingHorizontal: 6,
  },
});
export default MenuScreen;
