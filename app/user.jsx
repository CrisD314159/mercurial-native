import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import UserComponent from "../components/user/UserComponent";
export default function User(params) {
  return(
    <View style={{flex:'1', backgroundColor:'black'}}>
      <StatusBar style="light"/>
      <Stack.Screen
      options={{
        headerTitle: 'User',
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTitleStyle:{
          color: 'white'
        },
        headerLeft:()=>{},
        headerBackTitleVisible: false
      }}
      />
      <UserComponent/>

    </View>
  )
}