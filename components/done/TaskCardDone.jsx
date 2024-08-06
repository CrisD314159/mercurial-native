import { View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { logout, markAsRollBackTask } from "../../lib/queries";


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
export default function TaskCardDone({item, popDoneTask}) {
  const router = useRouter()

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data)=>{
      router.push('/')
    },
    onError: (error)=>{
      alert(error.message)
    }
  })

  const rollbackMutation = useMutation({
    mutationFn: markAsRollBackTask,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
      }else{
        popDoneTask(item.id)
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

  const rollback = (id)=>{
    rollbackMutation.mutate({taskId:id})
  }
  const [description, setDescription] = useState(false)
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
          <Text style={styles.text}>{item.subjectname}</Text>
        </View>
        <Text style={{color:`${item.topiccolor}`, fontSize: 12}}>{item.topictittle}</Text>
        <View style={styles.buttonCont}>
          <Pressable style={({pressed})=>[styles.button,{backgroundColor: pressed ? '#752BE6' : '#8F25E5'}]}
            onPress={()=> rollback(item.id)}
            >
            <Text style={styles.text}>Roll-Back</Text>
          </Pressable>
        </View>
      </View>

     {
        description &&(
        <View style={styles.descriptionCont}>
            <Text style={styles.text}>{item.description}</Text>
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
    width: 100,
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

  }
})