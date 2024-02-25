import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import assetsPaths from '../assetsPaths';

const ComboSelect = ({options, value, onSelect, style}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = option => {
    setModalVisible(false);
    onSelect(option.value);
  };

  return (
    <View style={style}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.selectButton}>
        <Text style={styles.selectButtonText}>
          {options[value] ? options[value]?.label : 'Select an option'}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalView}>
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.optionButton}
              onPress={() => handleSelect(option)}>
              <Text style={{color: assetsPaths.colors.orange, fontSize:18, fontWeight:'bold'}}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  selectButtonText: {
    fontSize: 18,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: assetsPaths.colors.orange,
    borderRadius: 5,
    marginVertical: 3,
    width: '90%',
    alignItems: 'center',
    minHeight: 48,
  },
});

export default ComboSelect;
