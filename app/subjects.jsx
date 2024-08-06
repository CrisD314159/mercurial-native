import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import SubjectsComponent from "../components/subjects/SubjectsComponent";

export default function Subjects(params) {
  return(
    <View style={{flex:'1', backgroundColor:'black'}}>
      <StatusBar style="light"/>
      <Stack.Screen
      options={{
        headerTitle: 'Subjects',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle:{
          color: 'white'
        },
        headerLeft:()=>{},
        headerBackTitleVisible: false
      }}
      />
      <SubjectsComponent/>
    </View>
  )
}