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
import ComboSelect from '../components/ComboSelect';
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
      addQuote(newQuote, () => {
        Alert.alert('Erfolg', 'Eigene Frage erfolgreich gespeichert', [
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
        color="dark"
        content="<"
      />
      <ScrollView style={styles.scroll_view}>
        <View style={styles.scroll_content}>
          <View style={styles.form}>
            <View style={styles.form_title}>
              <Text style={styles.label_color}>Neue Frage</Text>
            </View>
            <View style={styles.form_modal}>
              <Text style={[styles.label, styles.label_color]}>
                Kategorie :
              </Text>
              <ComboSelect
                style={styles.control}
                placeholder={'Wähle eine Kategorie'}
                options={[
                  {label: 'Ernste Fragen', value: 0},
                  {label: 'Lustige Fragen', value: 1},
                  {label: 'Unangenehme Fragen', value: 2},
                  {label: 'Fangfragen', value: 3},
                ]}
                value={newQuote?.category}
                onSelect={value => {
                  setNewQuote({...newQuote, category: value});
                }}
              />
            </View>
            <View style={styles.form_modal}>
              <Text style={[styles.label, styles.label_color]}>
                Geschlecht :
              </Text>
              <ComboSelect
                style={styles.control}
                placeholder={'Wähle das Geschlecht'}
                options={[
                  {label: 'Männlich', value: 0},
                  {label: 'Weiblich', value: 1},
                ]}
                value={newQuote?.gender}
                onSelect={value => {
                  setNewQuote({...newQuote, gender: value});
                }}
              />
            </View>
            <View style={styles.form_modal}>
              <Text style={[styles.label, styles.label_color]}>Inhalt :</Text>
              <TextInput
                style={styles.control}
                onChangeText={text => {
                  setNewQuote({...newQuote, content: text});
                }}
                value={newQuote?.content || ''}
                placeholder="Hier eingeben"
                autoCapitalize='none'
                autoFocus={true}
                maxLength={100}
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
                title="Hinzufügen"
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
              <Text style={styles.label_color}>Spielername</Text>
            </View>
            <View style={styles.form_modal}>
              <Text style={[styles.label, styles.label_color]}>Spieler 1:</Text>
              <TextInput
                style={styles.control}
                value={_players[0]?.name || ''}
                onChangeText={text => {
                  set_Players([{id: _players[1].id, name: text}, _players[1]]);
                }}
                autoCapitalize='none'
                autoFocus={true}
                maxLength={30}
              />
            </View>
            <View style={styles.form_modal}>
              <Text style={[styles.label, styles.label_color]}>Spieler 2:</Text>
              <TextInput
                style={styles.control}
                value={_players[1]?.name || ''}
                onChangeText={text => {
                  set_Players([_players[0], {id: _players[1].id, name: text}]);
                }}
                autoCapitalize='none'
                autoFocus={true}
                maxLength={30}
              />
            </View>

            <View style={styles.button_group}>
              <GroupButton
                style={styles.group_botton}
                title="Stornieren"
                onPress={handleCancelPlayers}
                disabled={
                  (players[0]?.name === _players[0]?.name &&
                    players[1]?.name === _players[1]?.name) ||
                  !_players[0]?.name ||
                  !_players[1]?.name
                }
                color="orange"
              />
              <GroupButton
                style={styles.group_botton}
                title="Speichern"
                onPress={handleSavePlayers}
                disabled={
                  (players[0]?.name === _players[0]?.name &&
                    players[1]?.name === _players[1]?.name) ||
                  !_players[0]?.name ||
                  !_players[1]?.name
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
    width: '100%',
    resizeMode: 'cover',
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
  section1_logo: {
    marginTop:12,
    height: 60,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
  },
  scroll_view: {},
  scroll_content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
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
    marginTop: 32,
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
    borderBottomColor: assetsPaths.colors.orange,
    marginBottom: 24,
    textAlign: 'center',
  },
  label_color: {
    color: assetsPaths.colors.orange,
  },
  label: {
    width: 90,
    lineHeight: 36,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  control: {
    flex: 1,
    color: 'black',
    backgroundColor: 'transparent',
    borderWidth: 1,
    fontSize: 18,
    height: 48,
    textAlign: 'center',
    marginHorizontal: 12,
    paddingHorizontal: 4,
    paddingVertical: 0,
    borderRadius: 5,
  },
});
export default NewQuoteScreen;
