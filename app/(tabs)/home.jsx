

import { View } from "react-native";
import ToDoComponent from "../../components/todo/ToDoComponent";
import { Stack } from "expo-router";


export default function ToDoTasks(){
  return (
    <View style={{flex:1, backgroundColor:'#000'}}>
      <Stack.Screen
      options={{
        headerShown: false
      }}/>
      <ToDoComponent/>

    </View>
  )
}