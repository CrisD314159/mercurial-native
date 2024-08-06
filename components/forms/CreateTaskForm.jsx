
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import PickerModal from "../picker/PickerModal";
import { useMutation } from "@tanstack/react-query";
import { createTask, getSubjects, getTopics, logout } from "../../lib/queries";
import { useRouter } from "expo-router";



export default function CreateTaskForm({setModalVisible, pushNewTask}) {
  const router = useRouter()
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [subjects, setSubjects] = useState([])
  const [topics, setTopics] = useState([])

  const setSelecteValueSubject = (value) => {
    setSubject(value);
  }
  const setSelecteValueTopic = (value) => {
    setTopic(value);
  }

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data)=>{
      router.push('/')
    },
    onError: (error)=>{
      alert(error.message)
    }
  })

  const subjectsMutation = useMutation({
    mutationFn: getSubjects,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
      }else{
        setSubjects(data.subjects)
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
  const topicsMutation = useMutation({
    mutationFn: getTopics,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
      }else{
        setTopics(data.topic)
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

  
  useEffect(()=>{
    subjectsMutation.mutate()
    topicsMutation.mutate()
  },[])


  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
      }else{
        pushNewTask(data.task)
        setModalVisible(false);
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
    if(subject && topic && taskTitle && taskDescription){
      createTaskMutation.mutate({tittle: taskTitle, description: taskDescription, subjectId:subject , topicId:topic})
    }else{
      alert('All fields are required to create a task')  
    }
    
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.modal}>
      <View style={styles.formCont}>
        <TextInput style={styles.input} placeholder="Task Title" placeholderTextColor={'white'} onChangeText={setTaskTitle} value={taskTitle} maxLength={18}/>
        <PickerModal title={"Select Subject"} options={subjects} setValue={setSelecteValueSubject} selected={subject}/>
        <PickerModal title={"Select Topic"} options={topics} setValue={setSelecteValueTopic} selected={topic}/>
        
        <TextInput style={[styles.input, {height:85}]} placeholder="Task Description" placeholderTextColor={'white'}
        onChangeText={setTaskDescription} value={taskDescription} multiline
        maxLength={50}
        />

      </View>
      

      <View style={styles.buttonCont}>
      <Pressable style={({pressed})=>[styles.button, {backgroundColor: pressed? '#AC040B':'#E50452'}]}
         onPress={()=> setModalVisible(false)}
        >
          <Text style={{color: 'white'}}>Cancel</Text>
        </Pressable>
        <Pressable style={({pressed})=>[styles.button, {backgroundColor: pressed? '#1C6907':'#30B00C'}]} onPress={handleCreation}>
          <Text style={{color: 'white'}}>Create Task</Text>
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
    height: '75%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input:{
    width: 250,
    height: 40,
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