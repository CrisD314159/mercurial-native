import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, Text, Image, Pressable, TextInput, StyleSheet, Linking, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { login } from "../../lib/queries";
import * as Secure from 'expo-secure-store'

export default function LoginComponent(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const handleSignUp = ()=>{
    Linking.openURL('https://mercurial-app.vercel.app/SignUp')  
  }
  const handleForgotPassword = ()=>{
    Linking.openURL('https://mercurial-app.vercel.app/users/recover/password/email')  
  }

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data)=>{
      if(data.success){
        router.push('/home')
      }else{
        alert(data.message)
      }
      
    },
    onError: (error)=>{
      alert(error.message)
    }
    
  })

  const handleLogin = ()=>{
    if(email === '' || password === ''){
      alert('Please fill in all fields')
    }else{
      loginMutation.mutate({email, password})
    }
  }


  return(

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <StatusBar style="light"/>
      <View style={styles.container}>
        <Image source={require('../../assets/Mercurial-trasparent.png')} style={styles.image}/>
        <Text style={styles.titleText}>Welcome To Mercurial</Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.inputCont}>
        <TextInput placeholder="Email" style={styles.input} placeholderTextColor={'white'}  textContentType="emailAddress" value={email} onChangeText={setEmail} autoCapitalize="none" inputMode="email"/>
        <TextInput placeholder="Password" style={styles.input} placeholderTextColor={'white'} textContentType="newPassword" secureTextEntry value={password} onChangeText={setPassword}/>
      </View>
      </KeyboardAvoidingView>
      <View style={styles.loginCont}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text >Log In</Text>
        </Pressable>
      </View>
      <View style={styles.signUpCont}>
        <Pressable style={styles.linkButton} onPress={handleSignUp} >
          <Text style={styles.linkText}>Sign Up</Text>
        </Pressable>
        <Pressable style={styles.linkButton} onPress={handleForgotPassword}>
          <Text style={styles.linkText}>Forgot Your Password?</Text>
        </Pressable>
      </View>
    </View>
    </TouchableWithoutFeedback>
   
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    marginTop: 50,
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  imageCont: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  titleText: {
    fontSize: 20,
    marginVertical: 10,
    color: 'white'
  },
  input:{
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    borderBottomColor: '#666',
    borderBottomWidth: 1,
    color: 'white'
  },
  inputCont:{
    width: 300,
    marginVertical: 10,
  },
  button:{
    width: 100,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  signUpCont:{
    marginBottom: 200,
    marginTop: 30,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCont:{
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,

  },
  linkButton:{
    width: 200,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
  
})