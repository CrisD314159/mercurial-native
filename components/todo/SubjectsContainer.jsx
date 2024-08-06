import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMutation } from "@tanstack/react-query";
import { getSubjects, logout } from "../../lib/queries";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";

// export interface Subject{
//   id: string,
//   name: string,
//   color: string,
//   state_id: string,
//   state_name:string,
//   user_id: string,
//   user_name: string,
// }


export default function SubjectsContainer({filterTasks}) {
  const router = useRouter()
  const [subjects, setSubjects] = useState([])
  const [pressed, setPressed] = useState('')
  const handlePress = (id)=>{
    filterTasks(id)
    setPressed(id)
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

  useEffect(()=>{
 
    subjectsMutation.mutate()

  },[])
 
  return(
    <View style={styles.wrapper}>
      {
        pressed && (
          <Pressable onPress={()=> handlePress('')} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="white" />
          </Pressable>
        )
      }
     
      {
        !subjects && subjects.length === 0 ? <Text style={styles.text}>No subjects to show</Text> : 
        <FlatList
            
            style={styles.container}
            data={subjects}
            renderItem={({item}) => {
            return(
            <Pressable style={[styles.card, {backgroundColor: pressed === item.id ? 'white' : '#0d0d0d'}]} 
              onPress={()=> handlePress(item.id)}
            >
              <Text style={[styles.text, {color: pressed === item.id ? 'black' : 'white'}]}>{item.name}</Text>
            </Pressable>
            )
          }}
          horizontal={true}
          />
      }

      

    </View>
   
  )
  
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20
  },
  wrapper:{
    height:80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card:{
    backgroundColor: '#0d0d0d',
    marginHorizontal: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 40,
    borderColor: '#666',
    borderWidth: 1,


  },
  text: {
    color: 'white'
  },
  closeButton:{
    borderRadius: 100,
    padding: 5,
    backgroundColor: '#E532DE',
  }
})