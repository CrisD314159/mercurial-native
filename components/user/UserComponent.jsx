import { Link, useRouter } from "expo-router";
import { View, Image, Text, Pressable, StyleSheet, Linking } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMutation } from "@tanstack/react-query";
import { getUser, logout } from "../../lib/queries";
import { useEffect, useState } from "react";

export default function UserComponent(params) {
  const router = useRouter()
  const [user, setUser] = useState({})
  const handleLink = () => {
    Linking.openURL('https://mercurial-app.vercel.app/');
  };

  const userMutation = useMutation({
    mutationFn: getUser,
    onSuccess: (data)=>{
      if(data.success === false){
        return alert(data.message)
      }
      setUser(data.user)      
    },
    onError:(error)=>{
      if(error.message === 'Unauthorized'){
        return logout()
      }
      alert(error.message)
    }

  })

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data)=>{
      router.push('/')
    },
    onError: (error)=>{
      alert(error.message)
    }
  })

  const handleLogout = ()=>{
    logoutMutation.mutate()
  }

  useEffect(()=>{
    userMutation.mutate()
  },[])

  return(
    <View style={styles.container}>
      <View style={styles.imageCont}>
        <Image source={{uri: `${user.image || 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'}`}} style={styles.image}/>
        <Text style={styles.titleText}>{user.name}</Text>
      </View>
      <View style={styles.textCont}>
        <Text style={styles.text}>{user.username}</Text>
        <Text style={styles.text}>{user.email}</Text>
      </View>
      <View style={styles.buttonCont}>
        <Pressable style={({pressed})=>[styles.button, {backgroundColor: pressed? '#FA257F': '#FA1CB1'}]} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="black" />
        </Pressable>

          <Pressable style={[styles.button,{backgroundColor:'#7DB2FA'}]} onPress={handleLink}>
          <MaterialIcons name="edit" size={24} color="black" />
        </Pressable>
  
      </View>
      <Text style={styles.text}>To edit your porfile, you should do it on the web</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  image:{
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  imageCont:{
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  titleText:{
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white'
  },
  textCont:{
    marginEnd: 10,
    width:'100%',
  },
  button: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: 5,
    width: 100,
    height: 40,
  },
  buttonCont:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 60
  },
})