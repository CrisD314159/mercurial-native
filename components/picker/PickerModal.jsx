import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import MyPicker from './MyPicker';

export default function PickerModal ({title, options, setValue, selected}) {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <MyPicker setModalVisible={setModalVisible} title={title} options={options} setValue={setValue} selected={selected} />
        </View>
      </Modal>
      <Pressable style={({pressed})=>[{backgroundColor: pressed ? '#2B2B2B': '#0d0d0d'}, styles.button]}
       onPress={() => setModalVisible(true)} 
        >
          <Text style={styles.textStyle}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  

  },
  button:{
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    width: 250,
    height: 40,
    borderColor: '#666',
    borderWidth: 1,
    paddingHorizontal: 10,

  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

