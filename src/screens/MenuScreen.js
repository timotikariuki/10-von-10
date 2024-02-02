import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  StatusBar,
  Text,
} from 'react-native';
import assetsPaths from '../assetsPaths';
import CardButton from '../components/CardButton';
import GroupButton from '../components/GroupButton';
import TransparentButton from '../components/TransparentButton';

import {QuoteContext} from '../database/db.context';

function MenuScreen({navigation}) {
  const {selected, players, oldQuoteItem, countIsRead} =
    useContext(QuoteContext);

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
            isLeft={idx % 2}
          />
        ))}

        <View style={styles.paragraph}>
          <Text style={styles.description}>
            Nächste Frage von{' '}
            <Text style={[styles.bold]}>{players[selected]?.name}</Text>
          </Text>
          <Text style={styles.description}>
            <Text style={[styles.bold]}>{countIsRead}</Text> Fragen gespielt
          </Text>
        </View>
      </View>

      <View style={styles.button_group}>
        <GroupButton
          style={styles.group_botton}
          title="vorherige Frage"
          disabled={!oldQuoteItem}
          onPress={() => {
            navigation.navigate('old_quote', {oldQuoteItem});
          }}
        />
        <GroupButton
          style={styles.group_botton}
          title="Zufallskategorie"
          onPress={() => {
            handlePress(Math.floor(Math.random() * 4));
          }}
        />
      </View>
      <View style={styles.button_group}>
        <GroupButton
          style={styles.group_botton}
          title="Eigene Fragen einsenden"
          color="transparent"
          size="lg"
          onPress={() => {
            navigation.navigate('new_quote');
          }}
        />
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
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 110,
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
    maxWidth: 150,
    marginBottom: 36,
    paddingHorizontal: 6,
  },
  paragraph: {
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  description: {
    color: '#5d5f5f',
    fontSize: 16,
    lineHeight: 32,
  },
  bright_blue: {
    color: assetsPaths.colors.bright_blue,
  },
  bold: {
    fontWeight: 'bold',
  },
});
export default MenuScreen;
