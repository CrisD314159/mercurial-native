import { FlatList, StyleSheet, View, Text, Pressable, ScrollView, RefreshControl } from "react-native";
import TaskCardDone from "./TaskCardDone";
import { StatusBar } from "expo-status-bar";
import { useMutation } from "@tanstack/react-query";
import { getDoneTasks, logout } from "../../lib/queries";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";



export default function DoneComponent() {
  const router = useRouter()
  const [doneTasks, setTasks] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data)=>{
      router.push('/')
    },
    onError: (error)=>{
      alert(error.message)
    }
  })

  const doneMutation = useMutation({
    mutationFn: getDoneTasks,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
        setRefreshing(false)
      }else{
        setTasks(data.tasks)
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

  const popDoneTask = (id)=>{
    setTasks(doneTasks.filter(task => task.id !== id))

  }

  const onRefresh = useCallback(()=>{
    setRefreshing(true)
    doneMutation.mutate()
  })

  useEffect(()=>{
    doneMutation.mutate()
  },[])
  return(
    <View style={styles.container}>
      <StatusBar style="light" />
        <View style={styles.banner}>
          <Text style={styles.text}>Done</Text>
      </View>
      {
        doneTasks && doneTasks.length > 0 ?
        <FlatList
        data={doneTasks}
        renderItem={({item})=> <TaskCardDone item={item} popDoneTask={popDoneTask}/>}
        keyExtractor={(item)=> item.id}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} tintColor={'white'} colors={'white'}/>
        }
      />:
      <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} tintColor={'white'} colors={'white'}/>
      }
      >
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
    shadowColor: '#53DB0F', // Color de la sombra
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