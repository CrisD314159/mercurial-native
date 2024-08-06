import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EditSubjectForm from '../forms/EditSubjectForm';
import EditTopicForm from '../forms/EditTopicForm';

export default function EditTopicModal({title, color, id, onRefresh}) {
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
        <View style={styles.centeredView}>
          <EditTopicForm setModalVisible={setModalVisible} color={color} title={title} id={id} onRefresh={onRefresh}/>
        </View>
      </Modal>
      <Pressable style={({pressed})=>[{backgroundColor: pressed ? '#303030': '#000'}, styles.button]}
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
    borderRadius: 10,
    width: 40,
    height: 30,
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

