import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  PanResponder,
  Alert,
} from 'react-native';

import GroupButton from '../components/GroupButton';
import assetsPaths from '../assetsPaths';
import TransparentButton from '../components/TransparentButton';

import {QuoteContext} from '../database/db.context';

function QuoteScreen({navigation, route}) {
  const targetCategory = route.params.category;
  const oldQuoteItem = route.params?.oldQuoteItem || false;

  const {
    selectOneRandomly,
    resetAllUnreadByCategory,
    setReadQuote,
    selected,
    setSelected,
    players,
  } = useContext(QuoteContext);

  const [quoteItem, setQuoteItem] = useState(undefined);
  const [quoteStatus, setQuoteStatus] = useState({
    total: 0,
    isRead: 0,
  });

  const callSelectOne = category => {
    selectOneRandomly({category}, ({total, isRead, selItem}) => {
      setSelected(selected === 0 ? 1 : 0);
      setQuoteStatus({total, isRead});
      setQuoteItem(selItem);

      if (total <= isRead)
        Alert.alert(
          'Bekanntmachung',
          'Vollendet! Markieren Sie bitte alle als ungelesen',
          [
            {text: 'Heim', onPress: handleBack},
            {
              text: 'Zurücksetzen',
              onPress: () => {
                resetAllUnreadByCategory({category}, () => {
                  Alert.alert(
                    'Erfolg',
                    'Erfolgreich zurückgesetzt! Genießen Sie es',
                    [
                      {
                        text: 'Stornieren',
                        onPress: () => {
                          callSelectOne(targetCategory);
                        },
                      },
                    ],
                  );
                });
              },
            },
          ],
        );
    });
  };

  const handleNext = () => {
    // tick selected item as read
    setReadQuote({quoteItem}, () => {
      callSelectOne(targetCategory);
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    callSelectOne(targetCategory);
  }, [targetCategory]);

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

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <ImageBackground
        style={styles.container}
        source={
          [
            assetsPaths.images.card_green,
            assetsPaths.images.card_blue,
            assetsPaths.images.card_gray,
            assetsPaths.images.card_pink,
          ][targetCategory]
        }>
        <TransparentButton
          onPress={() => {
            navigation.navigate('menu');
          }}
          style={styles.return_button}
          content="<"
        />
        <View style={styles.scroll_view}>
          <View style={styles.scroll_content}>
            <Image
              source={
                targetCategory > -1
                  ? assetsPaths.images.category_logos[targetCategory]
                  : assetsPaths.images.logo_black
              }
              style={styles.section1_logo}
            />

            <Text style={styles.text}>{quoteItem?.content}</Text>
            <Text
              style={[
                styles.description,
                quoteStatus.total === quoteStatus.isRead && styles.disabled,
              ]}>
              {`${players[selected]?.name}'s Frage`}
            </Text>

            <Text>
              {`(vollendet ${quoteStatus.isRead}/${quoteStatus.total})`}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={[styles.button_group, oldQuoteItem && styles.disabled]}>
        <GroupButton
          style={styles.group_botton}
          title="zufällig"
          onPress={handleNext}
          disabled={quoteStatus.total === quoteStatus.isRead}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section1_logo: {
    height: 180,
    resizeMode: 'contain',
    marginBottom: 48,
  },
  return_button: {
    position: 'absolute',
    top: 32,
    left: 20,
    backgroundColor: '#ffffff66',
  },
  container: {
    flex: 1,
  },
  scroll_view: {
    marginTop: 120,
    marginBottom: 120,
  },
  scroll_content: {
    alignItems: 'center',
  },
  text: {
    color: '#00303f',
    paddingHorizontal: 24,
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 48,
    minHeight: 120,
  },
  description: {
    color: '#5d5f5f',
    paddingHorizontal: 24,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
    paddingTop: 18,
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
  disabled: {
    display: 'none',
  },
});
export default QuoteScreen;
