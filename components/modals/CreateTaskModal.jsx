import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, KeyboardAvoidingView} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CreateTaskForm from '../forms/CreateTaskForm';

export default function CreateTaskModal ({pushNewTask}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <KeyboardAvoidingView behavior="height" style={{flex:1}}>
        <View style={styles.centeredView}>
          <CreateTaskForm setModalVisible={setModalVisible} pushNewTask={pushNewTask}/>
        </View>
        </KeyboardAvoidingView>
      </Modal>
      <Pressable style={({pressed})=>[{backgroundColor: pressed ? '#E5D9E4': '#fff'}, styles.button]}
       onPress={() => setModalVisible(true)} 
        >
          <MaterialIcons name="add" size={24} color="black" />
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

