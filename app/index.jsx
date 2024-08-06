import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import * as Secure from 'expo-secure-store';
import { getTasks, getUserInfo } from "../lib/queries";
import LoginComponent from "../components/login/LoginComponent";

export default function Index(params) {
  const router = useRouter()
  useEffect(()=>{
    const checkToken = async () => {
      const token = await Secure.getItemAsync('token');
      const valid = await getUserInfo(token);
      if (token && valid) {
        router.push('/home');
      } else {
        router.push('/login');
      }
    };

    checkToken();

  },[])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#000' }}>
      <Stack.Screen
      options={{
        headerShown: false
      }}
      />
      <ActivityIndicator size="large" color="#FFF"/>
    </View>
  )
  
}