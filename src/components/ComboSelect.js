import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import assetsPaths from '../assetsPaths';

const ComboSelect = ({
  options,
  value,
  onSelect,
  style,
  placeholder = 'Wähle eine Option',
}) => {
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
          {options[value] ? options[value]?.label : placeholder}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <TouchableOpacity
          style={styles.modalView}
          onPress={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalContent}>
            {options.map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.optionButton}
                onPress={() => handleSelect(option)}>
                <Text
                  style={{
                    color: assetsPaths.colors.orange,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
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
    minHeight: 48,
  },
  selectButtonText: {
    fontSize: 18,
    color: 'black',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    width: '90%',
    paddingVertical: 36,
    paddingHorizental: 12,
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
