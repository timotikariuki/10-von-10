import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ImageBackground, Text} from 'react-native';
import assetsPaths from '../assetsPaths';
import db from '../db';
import GroupButton from '../components/GroupButton';

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

  const handleReset = () => {
    // set all items of the category as unread
    selectNexItem();
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

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background_container}
        source={
          [
            assetsPaths.images.card_green,
            assetsPaths.images.card_blue,
            assetsPaths.images.card_gray,
            assetsPaths.images.card_pink,
          ][targetCategory]
        }>
        <View
          style={styles.content_container}
          onPress={() => {
            navigation.navigate('menu');
          }}>
          <Text style={styles.text}>{quoteItem.content}</Text>
          <Text
            style={
              styles.description
            }>{`vollendet ${quoteStatus.isRead}/${quoteStatus.total}`}</Text>
        </View>
      </ImageBackground>

      <View style={styles.button_group}>
        <GroupButton
          style={styles.group_botton}
          title="RETURN"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <GroupButton
          style={styles.group_botton}
          title="RESET"
          onPress={handleReset}
        />
        <GroupButton
          style={styles.group_botton}
          title="NEXT"
          onPress={handleNext}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24,
  },
  content_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#00303f',
    paddingHorizontal: 48,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 48,
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 36,
  },
  group_botton: {
    flexBasis: '33%',
    marginBottom: 36,
    paddingHorizontal: 6,
  },
});

export default QuoteScreen;
