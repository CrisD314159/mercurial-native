import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, KeyboardAvoidingView} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CreateTaskForm from '../forms/CreateTaskForm';
import EditTaskForm from '../forms/EditTaskForm';
import CalendarComponent from './CalendarComponent';

export default function CalendarModal ({item}) {
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
        <KeyboardAvoidingView behavior="height" style={{flex:1}}>
        <View style={styles.centeredView}>
          <CalendarComponent item={item} setModalVisible={setModalVisible}/>
        </View>
        </KeyboardAvoidingView>
      </Modal>
      <Pressable style={({pressed})=>[styles.editButton,{backgroundColor: pressed ? '#A6A6A6' : 'white'}]}
        onPress={() => setModalVisible(true)} 
          >
          <MaterialIcons name="schedule" size={24} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginRight: 10,
    width: 40,
    height: 40
  },
  editButton:{
   
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: 5,
    width: 35,
    height: 35,
    position: 'absolute',
    right: 0,
    top: 20
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

