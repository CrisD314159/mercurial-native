
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { createSubject, logout } from "../../lib/queries";
import { useRouter } from "expo-router";




export default function CreateSubjectForm({setModalVisible, pushSubject}) {

  const router = useRouter()
  const [subjectTitle, setSubjectTitle] = useState('');


  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data)=>{
      router.push('/')
    },
    onError: (error)=>{
      alert(error.message)
    }
  })

  const createSubjectMutation = useMutation({
    mutationFn: createSubject,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
      }else{
        pushSubject(data.subject)
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
    if(subjectTitle.length > 2){
      createSubjectMutation.mutate({name: subjectTitle, color:'#FFF'})
    }else{
      alert('Subject title must be at least 3 characters long')
    }
    
  }
 
  return (
   
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
    <View style={styles.modal}>
      <View style={styles.formCont}>
        <TextInput style={styles.input} placeholder="Subject Title" placeholderTextColor={'white'} onChangeText={setSubjectTitle} value={subjectTitle} maxLength={15}/>
      </View>

      <View style={styles.buttonCont}>
      <Pressable style={({pressed})=>[styles.button, {backgroundColor: pressed? '#AC040B':'#E50452'}]}
         onPress={()=> setModalVisible(false)}
        >
          <Text style={{color: 'white'}}>Cancel</Text>
        </Pressable>
        <Pressable style={({pressed})=>[styles.button, {backgroundColor: pressed? '#1C6907':'#30B00C'}]} onPress={handleCreation}>
          <Text style={{color: 'white'}}>Create Subject</Text>
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
    height: '20%',
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