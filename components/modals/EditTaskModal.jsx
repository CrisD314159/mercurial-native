import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, KeyboardAvoidingView} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CreateTaskForm from '../forms/CreateTaskForm';
import EditTaskForm from '../forms/EditTaskForm';

export default function EditTaskModal ({onRefresh, item}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
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
          <EditTaskForm setModalVisible={setModalVisible} onRefresh={onRefresh} item={item}/>
        </View>
        </KeyboardAvoidingView>
      </Modal>
      <Pressable style={({pressed})=>[styles.editButton,{backgroundColor: pressed ? 'magenta' : '#E633B5'}]}
        onPress={() => setModalVisible(true)} 
          >
          <MaterialIcons name="edit" size={24} color="white" />
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
    height: 35
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

