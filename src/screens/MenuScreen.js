import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import assetsPaths from '../assetsPaths';
import CardButton from '../components/CardButton';
import GroupButton from '../components/GroupButton';
import TransparentButton from '../components/TransparentButton';

function MenuScreen({navigation}) {
  const handlePress = category => {
    navigation.navigate('quote', {category});
  };

  const handleHelp = () => {
    navigation.navigate('help');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ImageBackground
        style={styles.background_container}
        source={assetsPaths.images.background_1}
      />
      <View style={styles.logo_container}>
        <View style={styles.logo_ring}>
          <Image style={styles.logo} source={assetsPaths.images.logo_black} />
        </View>
        <TransparentButton onPress={handleHelp} style={styles.help_button} />
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
        <GroupButton
          style={styles.group_botton}
          title="Zufallsmodus"
          onPress={() => {
            handlePress(Math.floor(Math.random() * 4));
          }}></GroupButton>
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
  help_button: {
    position: 'absolute',
    top: 0,
    right: 20,
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
  logo_ring: {
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
