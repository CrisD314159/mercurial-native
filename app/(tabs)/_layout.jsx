import { MaterialIcons } from '@expo/vector-icons';
import { Stack, Tabs } from "expo-router";

export default function TabsLayout(){
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor:"white",
      tabBarInactiveTintColor:"gray",
      headerShown: false,
      headerShadowVisible: true,
      tabBarStyle:{
        backgroundColor:"#0d0d0d",
        borderTopColor:"black",
      }
    }}
    >

      <Tabs.Screen
      name="home"
      
      options={{      
        tabBarIcon:({color})=>{
          return <MaterialIcons name="bookmark" size={30} color="#740CF9" />
        },
        tabBarLabel:"To Do",
        title:"To Do",
        
      }}

      />
      <Tabs.Screen
      name="done"
      options={{
        tabBarIcon:({color})=>{
         return <MaterialIcons name="done-all" size={30} color="green" />
        },
        tabBarLabel:"Done",
        headerLeft:()=>{},
        title:"Done",
      }}
      

      />
    
    </Tabs>
  )
} 