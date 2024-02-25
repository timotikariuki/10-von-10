import React from 'react';
import {Image, StyleSheet, View, Text, ImageBackground} from 'react-native';

import GroupButton from '../components/GroupButton';
import assetsPaths from '../assetsPaths';
import TransparentButton from '../components/TransparentButton';

function OldQuoteScreen({navigation, route}) {
  const oldQuoteItem = route.params.oldQuoteItem;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={
          [
            assetsPaths.images.card_green,
            assetsPaths.images.card_blue,
            assetsPaths.images.card_gray,
            assetsPaths.images.card_pink,
          ][oldQuoteItem.category]
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
            <Text style={styles.text}>{oldQuoteItem?.content}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.button_group}>
        <GroupButton
          style={styles.group_botton}
          title="Heim"
          onPress={handleBack}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  scroll_content: {
    alignItems: 'center',
  },
  text: {
    color: '#00303f',
    paddingHorizontal: 48,
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
export default OldQuoteScreen;
