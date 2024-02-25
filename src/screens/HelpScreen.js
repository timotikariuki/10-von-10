import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Text,
  ImageBackground,
  PanResponder,
} from 'react-native';
import GroupButton from '../components/GroupButton';
import assetsPaths from '../assetsPaths';
import TransparentButton from '../components/TransparentButton';

function HelpScreen({navigation}) {
  const [selected, setSelected] = useState(0);

  const handleNext = () => {
    if (selected < 4) {
      setSelected(selected + 1);
    }
  };

  const handleBack = () => {
    if (selected > 0) {
      setSelected(selected - 1);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (event, gestureState) => {
      // Set up conditions to check for a single-finger right gesture
      return gestureState.dx > 10 && Math.abs(gestureState.dy) < 10;
    },

    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dx < -40) handleNext();
      else if (gestureState.dx > 40) handleBack();
    },
  });

  const HelpSection1 = (
    <>
      <Image
        source={assetsPaths.images.logo_black}
        style={styles.section1_logo}
      />
      <Text style={styles.title}>Herzlich willkommen bei 10von10</Text>
    </>
  );

  const HelpSection2 = (
    <>
      <Text style={styles.title}>Bevor es losgeht…</Text>
      <Text style={styles.text}>
        Bevor ihr euch in dieses aufregende Spiel zu lustigen Gesprächen und
        stärkeren Bindungen stürzt, möchten wir euch von Herzen für euer
        Vertrauen danken.
      </Text>
      <Text style={styles.text}>
        Unsere Mission ist es, Beziehungen zu vertiefen und bedeutungsvolle
        Gespräche zu fördern und ihr seid ein wichtiger Teil davon.
      </Text>
      <Text style={styles.text}>
        Wir würden uns freuen, wenn ihr eure Erfahrungen auch mit anderen teilt.
      </Text>
      <Text style={styles.text}>
        Wenn ihr möchtet, könnt ihr ein Bild oder einen Screenshot von eurem
        Spielerlebnis auf Social Media posten. Verwendet dazu gerne den Hashtag
        #10von10. Wir freuen uns darauf, eure Beiträge zu sehen und mit euch in
        Verbindung zu bleiben.
      </Text>
      <Text style={styles.text}>
        Viel Spaß und lasst uns unvergessliche Gespräche führen!
      </Text>
    </>
  );

  const HelpSection3 = (
    <View style={styles.section3_container}>
      <Text style={styles.section3_title}>
        Über 200 verschiedene Fragekarten mit 4 unterschiedlichen Kategorien
      </Text>
      <Image
        source={assetsPaths.images.tri_questions}
        style={styles.section3_logo}
      />
    </View>
  );

  const HelpSection4 = (
    <>
      <Text style={styles.section4_text}>1{')'} Unangenehme Fragen</Text>
      <Text style={styles.text}>
        Bringe dein Gegenüber spielerisch in Verlegenheit! In dieser Kategorie
        werden auf eine lustige Art und Weise die Fragen beantwortet, die man
        ohne ein Spiel nicht wirklich stellen könnte. Diese Kategorie hilft euch
        sehr das Eis auf eine angenehme Art zu brechen.
      </Text>

      <Text style={styles.section4_text}>2{')'} Lustige Fragen</Text>
      <Text style={styles.text}>
        Hier entdeckst du Fragen, die lustige und unvergessliche Gespräche
        ermöglichen. Gemeinsames Lachen über alberne Fragen und Themen sorgen
        für eine harmonische Sympathie zwischen den Spielern.
      </Text>

      <Text style={styles.section4_text}>3{')'} Ernste Fragen</Text>
      <Text style={styles.text}>
        Hier findest du auf spielerische Art und Weise heraus, wie dein
        Gegenüber über ernste Themen des Lebens denkt. Außerdem kannst du deine
        eigenen Ansichten ganz ungezwungen mit den Spielern offenbaren und mehr
        über dich und deinen Charakter preisgeben.
      </Text>

      <Text style={styles.section4_text}>4{')'} Fangfragen</Text>
      <Text style={styles.text}>
        In dieser Kategorie sind absolute No-Go´s enthalten, um sogenannte Red
        Flags aufzudecken und über solche gemeinsam spielerisch zu diskutieren
        und zu lachen.
      </Text>
    </>
  );

  const HelpSection5 = (
    <>
      <Text style={styles.title}>Spielanleitung</Text>
      <Text style={styles.text}>
        Die Spieler sind nach jeder Karte abwechselnd an der Reihe. Der Spieler,
        der das Spiel vorgeschlagen hat, darf die Kategorie aussuchen mit der
        ihr beginnt.
      </Text>
      <Text style={styles.text}>
        Derjenige der mit der ersten Frage dran ist, beantwortet sie zuerst
        selbst und dann dürfen die anderen Spieler, ihre eigenen Antworten
        mitteilen.
      </Text>
      <Text style={styles.text}>
        Nachdem 5 Fragen aus einer Kategorie beantwortet wurden, geht es zur
        nächsten Kategorie über. Wenn ihr bei der letzten Kategorie ebenfalls 5
        Fragen beantwortet habt, springt ihr wieder zu eurer ersten Kategorie
        und wählt 5 neue Fragen.
      </Text>
      <Text style={styles.text}>
        Wir empfehlen, die Fragen gelegentlich mit euren eigenen Fragen zu
        kombinieren, damit ihr eure eigene Note miteinbringen könnt, sodass das
        Erlebnis so persönlich wie möglich wird.
      </Text>
      <Text style={styles.text}>
        Lasst euch gerne zwischen den Fragen Zeit und begründet eure
        Bewertungen. Das macht eure Entscheidung verständlicher für die anderen
        Personen.
      </Text>
    </>
  );

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <ImageBackground
        style={styles.container}
        source={assetsPaths.images.card_white}>
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
            {
              [
                HelpSection1,
                HelpSection2,
                HelpSection3,
                HelpSection4,
                HelpSection5,
              ][selected]
            }
          </View>
        </ScrollView>
      </ImageBackground>

      <View style={styles.button_group}>
        <GroupButton
          style={styles.group_botton}
          title="<< ZURÜCK"
          onPress={handleBack}
          disabled={selected === 0}
          color="orange"
        />
        <GroupButton
          style={styles.group_botton}
          title="NÄCHSTE >>"
          onPress={handleNext}
          disabled={selected === 4}
          color="orange"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section1_logo: {
    height: 280,
    resizeMode: 'contain',
  },
  return_button: {
    position: 'absolute',
    top: 56,
    left: 20,
    zIndex: 99,
    backgroundColor: '#fff7',
  },
  container: {
    flex: 1,
  },
  scroll_view: {
    marginTop: 120,
    marginBottom: 120,
  },
  scroll_content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#00303f',
    width: '100%',
    paddingHorizontal: 48,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 48,
    marginTop: 48,
    marginBottom: 16,
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
    position: 'absolute',
    bottom: 36,
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
});
export default HelpScreen;
