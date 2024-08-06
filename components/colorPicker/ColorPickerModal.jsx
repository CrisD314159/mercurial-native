import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import ColorPickerMenu from './ColorPickerMenu';

export default function ColorPickerModal ({color, setColor}) {
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
          <ColorPickerMenu setModalVisible={setModalVisible} color={color} serColor={setColor}/>
        </View>
      </Modal>
      <View >
      <Text style={[styles.textStyle, {marginBottom:10}]}>Pick a color</Text>

      <Pressable style={({pressed})=>[{backgroundColor: pressed ? '#2B2B2B': '#0d0d0d'}, styles.button]}
       onPress={() => setModalVisible(true)} 
        >
         
        
          <View style={[{backgroundColor: color, width: 250, height: 40, borderRadius: 10}]}></View>
      </Pressable>
      </View>
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

