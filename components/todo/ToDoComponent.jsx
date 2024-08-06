import { FlatList, StyleSheet, View, Text, Pressable, ScrollView, RefreshControl, Platform } from "react-native";
import TaskCard from "./TaskCard";
import { StatusBar } from "expo-status-bar";
import { Stack, useRouter } from "expo-router";
import ButtonContainer from "./ButtonContainer";
import SubjectsContainer from "./SubjectsContainer";
import CreateTaskModal from "../modals/CreateTaskModal";
import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getTasks, logout } from "../../lib/queries";
import * as Calendar from 'expo-calendar';
import CalendarComponent from "../calendar/CalendarComponent";

export default function ToDoComponent() {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data)=>{
      router.push('/')
    },
    onError: (error)=>{
      alert(error.message)
    }
  })



  const tasksMutation = useMutation({
    mutationFn: getTasks,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
      }else{
        setTasks(data.tasksUser)
        setFilteredTasks(data.tasksUser)
        setRefreshing(false)
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

  const pushNewTask = (task)=>{
    setTasks([...tasks, task])
    setFilteredTasks([...tasks, task])
  }

  
  const filterTasks = (subjectId) => {
    // Función que se encarga de filtrar las tareas por asignatura
    if (subjectId !== '') { // Si el id de la asignatura es 0, entonces mostramos todas las tareas
      setFilteredTasks(tasks.filter(task => task.subjectid === subjectId)) // Filtramos las tareas por asignatura

    } else {
      setFilteredTasks(tasks) // Si el id de la asignatura es '', entonces mostramos todas las tareas
    }

  }

  const popTask = (id)=>{
    setTasks(tasks.filter(task => task.id !== id))
    setFilteredTasks(tasks.filter(task => task.id !== id))
  }

  const onRefresh = useCallback(()=>{
    setRefreshing(true)
    tasksMutation.mutate()
  })

  useEffect(()=>{

    tasksMutation.mutate()
    
  },[])

  return(
    <View style={styles.container}>
      <Stack.Screen
      options={{
        headerShown: false
      }}
      />
      <StatusBar style="light" />
      <ButtonContainer/>
      <SubjectsContainer filterTasks={filterTasks}/>
      <View style={styles.addButtonCont}>
        <CreateTaskModal pushNewTask={pushNewTask}/>
        <View style={styles.banner}>
          <Text style={styles.text}>To-Do</Text>
        </View>
      </View>
    
      {tasks && tasks.length > 0 ? 
     
       <FlatList
       data={filteredTasks}
       renderItem={({item}) => <TaskCard item={item} popTask={popTask} onRefresh={onRefresh}/>}
       keyExtractor={item => item.id} 
       refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} colors={'white'} tintColor={'white'}/>
       } />
      :
      <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} colors={'white'} tintColor={'white'}/>
      }>
        <Text style={styles.text}>No tasks to show</Text>
      </ScrollView>
      }
     
    </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'black',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  banner:{
    width: '85%',
    borderRadius: 20,
    borderColor: '#666',
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#740CF9', // Color de la sombra
    textShadowOffset: {width: 20, height: 0},
    shadowOpacity: 1, // Opacidad de la sombra
    shadowRadius: 1, // Radio de la sombra
    marginVertical: 10,
    paddingVertical: 12,

  },
  text: {
    color: 'white'
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginRight: 10,
    width: 40,
    height: 40
  },
  addButtonCont:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
    
  }
})