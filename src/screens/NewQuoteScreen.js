import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import GroupButton from '../components/GroupButton';
import assetsPaths from '../assetsPaths';
import TransparentButton from '../components/TransparentButton';
import {QuoteContext} from '../database/db.context';

function NewQuoteScreen({navigation}) {
  const {addQuote, updateUserName, players} = useContext(QuoteContext);

  const [_players, set_Players] = useState([{}, {}]);
  const [newQuote, setNewQuote] = useState({
    content: '',
    gender: -1,
    category: -1,
  });

  useEffect(() => {
    set_Players(players);
  }, [players]);

  const handleSavePlayers = () => {
    if (players[0].name === players[1].name)
      Alert.alert('Bekanntmachung', 'Bitte verwenden Sie einen anderen Namen!');
    else
      updateUserName(_players, () => {
        Alert.alert('Erfolg', 'Spielername erfolgreich geändert!');
      });
  };

  const handleCancelPlayers = () => {
    set_Players([...players]);
  };

  const handleSaveQuote = () => {
    if (Number.isNaN === parseInt(newQuote.category)) {
      Alert.alert('Bekanntmachung', 'Neues Angebot erfolgreich gespeichert!');
    } else
      addQuote(newQuote, () => {
        Alert.alert('Erfolg', 'Neues Angebot erfolgreich gespeichert!', [
          {
            text: 'Ok',
            onPress: () => {
              setNewQuote({content: '', gender: -1, category: -1});
            },
          },
        ]);
      });
  };

  const handleCancelQuote = () => {
    setNewQuote({content: '', gender: -1, category: -1});
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background_container}
        source={assetsPaths.images.background_1}>
        <Image
          source={assetsPaths.images.logo_black}
          style={styles.section1_logo}
        />
      </ImageBackground>
      <TransparentButton
        onPress={() => {
          navigation.navigate('menu');
        }}
        style={styles.return_button}
        color="dark"
        content="<"
      />
      <ScrollView style={styles.scroll_view}>
        <View style={styles.scroll_content}>
          <View style={styles.form}>
            <View style={styles.form_title}>
              <Text>Neue Frage</Text>
            </View>
            <View style={styles.form_modal}>
              <Text style={styles.label}>Kategorie :</Text>
              <TextInput
                style={styles.control}
                onChangeText={text => {
                  setNewQuote({...newQuote, category: text});
                }}
                value={newQuote?.category.toString() || ''}></TextInput>
            </View>
            <View style={styles.form_modal}>
              <Text style={styles.label}>Gender :</Text>
              <TextInput
                style={styles.control}
                onChangeText={text => {
                  setNewQuote({...newQuote, gender: text});
                }}
                value={newQuote?.gender.toString() || ''}></TextInput>
            </View>
            <View style={styles.form_modal}>
              <Text style={styles.label}>Inhalt :</Text>
              <TextInput
                style={styles.control}
                onChangeText={text => {
                  setNewQuote({...newQuote, content: text});
                }}
                value={newQuote?.content || ''}
                placeholder="Hier eingeben"
              />
            </View>

            <View style={styles.button_group}>
              <GroupButton
                style={styles.group_botton}
                title="Stornieren"
                onPress={handleCancelQuote}
                disabled={
                  newQuote.content === '' &&
                  newQuote.gender === -1 &&
                  newQuote.category === -1
                }
                color="orange"
              />
              <GroupButton
                style={styles.group_botton}
                title="Speichern"
                onPress={handleSaveQuote}
                disabled={
                  newQuote.content === '' ||
                  newQuote.gender === -1 ||
                  newQuote.category === -1
                }
                color="orange"
              />
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.form_title}>
              <Text>Spielername</Text>
            </View>
            <View style={styles.form_modal}>
              <Text style={styles.label}>Spieler 1:</Text>
              <TextInput
                style={styles.control}
                value={_players[0]?.name || ''}
                onChangeText={text => {
                  set_Players([{id: _players[1].id, name: text}, _players[1]]);
                }}
              />
            </View>
            <View style={styles.form_modal}>
              <Text style={styles.label}>Spieler 2:</Text>
              <TextInput
                style={styles.control}
                value={_players[1]?.name || ''}
                onChangeText={text => {
                  set_Players([_players[0], {id: _players[1].id, name: text}]);
                }}
              />
            </View>

            <View style={styles.button_group}>
              <GroupButton
                style={styles.group_botton}
                title="Stornieren"
                onPress={handleCancelPlayers}
                disabled={
                  players[0]?.name === _players[0]?.name &&
                  players[1]?.name === _players[1]?.name
                }
                color="orange"
              />
              <GroupButton
                style={styles.group_botton}
                title="Speichern"
                onPress={handleSavePlayers}
                disabled={
                  players[0]?.name === _players[0]?.name &&
                  players[1]?.name === _players[1]?.name
                }
                color="orange"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background_container: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 36,
  },
  section1_logo: {
    height: '80%',
    resizeMode: 'contain',
  },
  return_button: {
    position: 'absolute',
    top: 32,
    left: 20,
  },
  container: {
    flex: 1,
  },
  scroll_view: {},
  scroll_content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    color: '#00303f',
    width: '100%',
    paddingHorizontal: 48,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
  },
  text: {
    color: '#00303f',
    width: '100%',
    paddingHorizontal: 48,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 36,
    marginBottom: 16,
  },
  section3_container: {
    width: '100%',
    paddingHorizontal: 48,
    paddingBottom: 200,
    position: 'relative',
    marginTop: 160,
  },
  section3_title: {
    maxWidth: 360,
    color: '#00303f',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 48,
  },
  section3_logo: {
    position: 'absolute',
    bottom: 0,
    right: 24,
    height: 280,
    resizeMode: 'contain',
    opacity: 0.7,
  },
  section4_text: {
    color: '#00303f',
    width: '100%',
    paddingHorizontal: 48,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  button_group: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  group_botton: {
    flexBasis: '30%',
    minWidth: 150,
    marginBottom: 36,
    paddingHorizontal: 6,
  },
  form: {
    padding: 12,
    paddingTop: 24,
    marginHorizontal: 12,
    marginVertical: 32,
    borderColor: assetsPaths.colors.orange,
    borderWidth: 1,
    borderRadius: 8,
  },
  form_modal: {
    width: '100%',
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form_title: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    width: 100,
    fontSize: 18,
    lineHeight: 36,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  control: {
    flex: 1,
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    fontSize: 18,
    height: 36,
    lineHeight: 36,
    textAlign: 'center',
    marginHorizontal: 24,
    paddingHorizontal: 4,
    paddingVertical: 0,
  },
});
export default NewQuoteScreen;
