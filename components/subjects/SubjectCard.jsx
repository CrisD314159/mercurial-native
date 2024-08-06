import { Pressable, StyleSheet, View, Text } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EditSubjectModal from "../modals/EditSubjectModal";
import { useMutation } from "@tanstack/react-query";
import { deleteSubject, logout } from "../../lib/queries";
import { useRouter } from "expo-router";

export default function SubjectCard({title, id, onRefresh, popSubject}) {
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

  const deleteSubjectMutation = useMutation({
    mutationFn: deleteSubject,
    onSuccess: (data)=>{
      if(data.success === false){
        alert(data.message)
      }else{
        popSubject(id)
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

  const handleDelete = (id)=>{
    deleteSubjectMutation.mutate(id)
  }

  return(
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonCont}>
        <EditSubjectModal title={title} id={id} onRefresh={onRefresh}/>
        <Pressable style={({pressed})=> [{backgroundColor: pressed ? '#303030': '#000'}, styles.button]} onPress={()=> handleDelete(id)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </Pressable>
      </View>
    </View>
  )
  
}

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor:'black',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderColor: '#666',
    borderWidth: 1,
    width: 300,
    borderRadius: 20,
    height: 150,
    marginVertical: 20
  },
  title:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonCont:{
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 90,
    justifyContent: 'space-between',
    marginVertical: 10
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 40,
    height: 30,
  },
  }
)