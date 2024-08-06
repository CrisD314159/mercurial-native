import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import TopicsComponent from "../components/topics/TopicsComponent";
export default function Topics(params) {
  return(
    <View style={{flex:'1', backgroundColor:'black'}}>
      <StatusBar style="light"/>
      <Stack.Screen
      options={{
        headerTitle: 'Topics',
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
      <TopicsComponent/>
    </View>
  )
}