import { View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteTask, logout, markAsDoneTask } from "../../lib/queries";
import { useRouter } from "expo-router";
import EditTaskModal from "../modals/EditTaskModal";
import CalendarModal from "../calendar/CalendarModal";

// export interface Task{
//   id: string,
//   tittle: string,
//   description: string,
//   stateid: string,
//   statename: string,
//   subjectid: string,
//   subjectname:string,
//   topicid: string,
//   topictittle: string,
//   topiccolor: string,
// }
export default function TaskCard({item, popTask, onRefresh}) {
  const router = useRouter()
  const [description, setDescription] = useState(false)

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data)=>{
      router.push('/')
    },
    onError: (error)=>{
      alert(error.message)
    }
  })

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
      }else{
        popTask(item.id)
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

  const markAsDoneMutation = useMutation({
    mutationFn: markAsDoneTask,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
      }else{
        popTask(item.id)
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

  const markAsDone = (id)=>{
    markAsDoneMutation.mutate({taskId:id})
  }

  const handleDeleteTask =(id)=>{
    deleteTaskMutation.mutate(id)

  }


  return(
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Pressable onPress={()=> setDescription(!description)}
          style = {({pressed})=>[{backgroundColor: pressed ? 'navy' : 'black', borderRadius: 100, padding: 3}]}
          >
          <MaterialIcons name="bookmark" size={24} color="white" />
        </Pressable>
        <View>
          <Text style={styles.text}>{item.tittle}</Text>
          <Text style={styles.subjectText}>{item.subjectname}</Text>
        </View>
        <Text style={{color:`${item.topiccolor}`, fontSize: 12}}>{item.topictittle}</Text>
        <View style={styles.buttonCont}>
          <Pressable style={({pressed})=>[styles.button,{backgroundColor: pressed ? '#35DC3E' : '#6BD826'}]}
            onPress={()=> markAsDone(item.id)}
            >
            <MaterialIcons name="done" size={24} color="white" />
          </Pressable>
          <EditTaskModal item={item} onRefresh={onRefresh}/>
          <Pressable style={({pressed})=>[styles.button,{backgroundColor: pressed ? '#E01B16' : '#E0154D'}]} onPress={()=> handleDeleteTask(item.id)}>
            <MaterialIcons name="delete" size={24} color="white" />
          </Pressable>
        </View>
      </View>

     {
        description &&(
        <View style={styles.descriptionCont}>
            <Text style={styles.text}>{item.description}</Text>
            <CalendarModal item={item}/>
        </View>

        )
     }

      
      

    </View>
  )
  
}


const styles = StyleSheet.create({
  mainContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black',
    paddingHorizontal: 10,
    paddingVertical: 20
  },

  container: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 20,
  },
  text: {
    color: 'white'
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: 5,
    width: 35,
    height: 35
  },
  descriptionCont:{
    width: '100%',
    height: 90,
    padding: 10,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonCont:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  subjectText:{
    color: 'white',
    fontSize: 12,
    fontWeight:'300',
    marginTop: 5
  }
})