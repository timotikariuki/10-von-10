import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  PanResponder,
} from 'react-native';
import db from '../db';

import GroupButton from '../components/GroupButton';
import assetsPaths from '../assetsPaths';
import TransparentButton from '../components/TransparentButton';

function QuoteScreen({navigation, route}) {
  const targetCategory = route.params.category;
  const [quoteItem, setQuoteItem] = useState('');
  const [quoteStatus, setQuoteStatus] = useState({
    total: 0,
    isRead: 0,
  });

  const handleNext = () => {
    // tick selected item as read
    selectNexItem();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const selectNexItem = () => {
    const category_items = db.filter(item => item.category === targetCategory);
    const isunRead = category_items.filter(item => !item.isRead);

    setQuoteStatus({
      total: category_items.length,
      isRead: category_items.length - isunRead.length,
    });

    const randomIndex = Math.floor(Math.random() * isunRead.length);
    setQuoteItem(isunRead[randomIndex]);
  };

  useEffect(() => {
    selectNexItem();
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
          color="dark"
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

            <Text style={styles.text}>{quoteItem.content}</Text>
            <Text
              style={
                styles.description
              }>{`vollendet ${quoteStatus.isRead}/${quoteStatus.total}`}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.button_group}>
        <GroupButton
          style={styles.group_botton}
          title="zufällig"
          onPress={handleNext}
          // disabled={selected === 4}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section1_logo: {
    height: 320,
    height: 240,
    resizeMode: 'contain',
    marginBottom: 48
  },
  return_button: {
    position: 'absolute',
    top: 32,
    left: 20,
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
    paddingHorizontal: 48,
    width: "100%",
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 48,
    minHeight: 120
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
});
export default QuoteScreen;
