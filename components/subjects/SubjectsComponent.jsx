import { FlatList, StyleSheet, View, Text, RefreshControl, ScrollView } from "react-native";
import SubjectCard from "./SubjectCard";
import CreateSubjectModal from "../modals/CreateSubjectModal";
import { useMutation } from "@tanstack/react-query";
import { getSubjects, logout } from "../../lib/queries";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function SubjectsComponent(params) {
  const router = useRouter()
  const [subjects, setSubjects] = useState([])
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

  const subjectsMutation = useMutation({
    mutationFn: getSubjects,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
        setRefreshing(false)

      }else{
        setSubjects(data.subjects)
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

  const popSubject = (id)=>{
    setSubjects(subjects.filter(subject => subject.id !== id))
  }

  const pushSubject = (subject)=>{
    setSubjects([...subjects, subject])
  }

  const onRefresh = useCallback(()=>{
    setRefreshing(true)
    subjectsMutation.mutate()
  })

  useEffect(()=>{
 
    subjectsMutation.mutate()

  },[])
  return(
    <View style={{ alignItems:'center', paddingBottom: 10, flex:1}}>
      <View style={styles.container}>
        <CreateSubjectModal pushSubject={pushSubject}/>
      </View>
      {
        subjects && subjects.length > 0 ?
        <FlatList
        data={subjects}
        renderItem={({item})=> <SubjectCard title={item.name} id={item.id} onRefresh={onRefresh} popSubject={popSubject}/>}
        keyExtractor={(item)=> item.id}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} tintColor={'white'} colors={'white'}/>
        }
        />
        :
        <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} tintColor={'white'} colors={'white'}/>
        }>
          <Text style={styles.text}>No subjects to show</Text>
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