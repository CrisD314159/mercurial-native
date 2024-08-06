
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import ColorPickerModal from "../colorPicker/ColorPickerModal";
import { logout, updateTopic } from "../../lib/queries";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";


export default function EditTopicForm({setModalVisible, title, color, id, onRefresh}) {
  const router = useRouter()
  const [topicTitle, setTopicTitle] = useState(title);
  const [topicColor, setColor] = useState(color);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data)=>{
      router.push('/')
    },
    onError: (error)=>{
      alert(error.message)
    }
  })

  const updateTopicMutation = useMutation({
    mutationFn: updateTopic,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
      }else{
        onRefresh()
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
    if(topicTitle.length > 2 && topicColor){
      updateTopicMutation.mutate({tittle: topicTitle, color: topicColor, id: id})
    

    }else{
      alert('All fields are required')
    }
    
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

    <View style={styles.modal}>
      <View style={styles.formCont}>
        <TextInput style={styles.input} placeholder="Topic Title" placeholderTextColor={'white'} onChangeText={setTopicTitle} value={topicTitle} maxLength={12}/>
        <ColorPickerModal color={topicColor} setColor={setColor} />
      </View>

      <View style={styles.buttonCont}>
      <Pressable style={({pressed})=>[styles.button, {backgroundColor: pressed? '#AC040B':'#E50452'}]}
         onPress={()=> setModalVisible(false)}
        >
          <Text style={{color: 'white'}}>Cancel</Text>
        </Pressable>
        <Pressable style={({pressed})=>[styles.button, {backgroundColor: pressed? '#1C6907':'#30B00C'}]} onPress={handleCreation}>
          <Text style={{color: 'white'}}>Update Topic</Text>
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