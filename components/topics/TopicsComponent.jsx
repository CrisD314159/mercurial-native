import { FlatList, StyleSheet, View, Text, RefreshControl, ScrollView } from "react-native";

import CreateSubjectModal from "../modals/CreateSubjectModal";
import TopicCard from "./TopicCard";
import CreateTopicModal from "../modals/CreateTopicModal";
import { useMutation } from "@tanstack/react-query";
import { getTopics, logout } from "../../lib/queries";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";

// export interface Topic{
//   id: string,
//   tittle: string,
//   usuario_id: string,
//   state:string,
//   color: string
// }

export default function TopicsComponent(params) {
  const router = useRouter()
  const [topics, setTopics] = useState([])
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
 
  const topicsMutation = useMutation({
    mutationFn: getTopics,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
        setRefreshing(false)
      }
      setTopics(data.topic)
      setRefreshing(false)
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

  const popTopic = (id)=>{
    setTopics(topics.filter(topic => topic.id != id))
  }

  const onRefresh = useCallback(()=>{
    setRefreshing(true)
    topicsMutation.mutate()
  })

  const pushTopic = (topic)=>{
    setTopics([...topics, topic])
  }


  useEffect(()=>{
    topicsMutation.mutate()
  },[])

  return(
    <View style={{ alignItems:'center', paddingBottom: 10, flex:1}}>
      <View style={styles.container}>
        <CreateTopicModal pushTopic={pushTopic}/>
      </View>

      {
        topics && topics.length > 0 ?
        <FlatList
        data={topics}
        renderItem={({item})=> <TopicCard title={item.tittle} id={item.id} color={item.color} onRefresh={onRefresh} popTopic={popTopic}/>}
        keyExtractor={(item)=> item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={'white'} colors={'white'}/>
        }
      />:
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={'white'} colors={'white'}/>
      }
      >

        <Text style={styles.text}>No topics to show</Text>
      </ScrollView>
        
      }
    
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 25,
  },
  text: {
    color: 'white'
  }

})