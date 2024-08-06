
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import ColorPickerModal from "../colorPicker/ColorPickerModal";
import { useMutation } from "@tanstack/react-query";
import { createTopic, logout } from "../../lib/queries";
import { useRouter } from "expo-router";




export default function CreateTopicForm({setModalVisible, pushTopic}) {
  const router = useRouter()
  const [topicTitle, setTopicTitle] = useState('');
  const [color, setColor] = useState('#fff');


  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data)=>{
      router.push('/')
    },
    onError: (error)=>{
      alert(error.message)
    }
  })

  const createTopicMutation = useMutation({
    mutationFn: createTopic,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
      }else{
        pushTopic(data.topic)
        setModalVisible(false)
      }
    },
    onError: (error)=>{
      if(error.message === 'Unauthorized'){
        alert('Session expired, login again')
        logoutMutation.mutate()
      }else{
        alert(error.message)
      }
    }
  })


  const handleCreation = ()=>{
    if(topicTitle.length > 2 && color){
      createTopicMutation.mutate({tittle: topicTitle, color: color})
    }else{
      alert('All fields are required')
    }
    
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.modal}>
      <View style={styles.formCont}>
        <TextInput style={styles.input} placeholder="Topic Title" placeholderTextColor={'white'} onChangeText={setTopicTitle} value={topicTitle} maxLength={12}/>
        <ColorPickerModal setColor={setColor} color={color}/>
      </View>

      <View style={styles.buttonCont}>
      <Pressable style={({pressed})=>[styles.button, {backgroundColor: pressed? '#AC040B':'#E50452'}]}
         onPress={()=> setModalVisible(false)}
        >
          <Text style={{color: 'white'}}>Cancel</Text>
        </Pressable>
        <Pressable style={({pressed})=>[styles.button, {backgroundColor: pressed? '#1C6907':'#30B00C'}]} onPress={handleCreation}>
          <Text style={{color: 'white'}}>Create Topic</Text>
        </Pressable>
      </View>
      


    </View>
    </TouchableWithoutFeedback>
  )
  
}

const styles = StyleSheet.create({
  modal:{
    margin: 20,
    backgroundColor: '#0d0d0d',
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '80%',
    height: '30%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input:{
    width: 250,
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 10,
    color: 'white'
  },
  buttonCont:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
    position: 'absolute',
    bottom: 0
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
    width: 100,
    height: 40
  },
  picker: {
    height: 50,
    width: 250,
  },
  formCont:{
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})