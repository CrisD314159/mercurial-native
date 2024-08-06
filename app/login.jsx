import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import LoginComponent from "../components/login/LoginComponent";

export default function Login(params) {
  return (
    <View style={{flex:'1', backgroundColor:'black'}}>
      <StatusBar style="light"/>
      <Stack.Screen
      options={{
        headerShown: false
      }}
      />
      <LoginComponent/>
    </View>
  )
  
}