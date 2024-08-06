import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Image } from "react-native";
import ProfilePicture from "../components/header/ProfilePicture";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

export default function Layout() {
  return(

    <QueryClientProvider client={queryClient}>

    <View style={{flex:'1'}}>
      <StatusBar style="light"/>
      <Stack
      screenOptions={{
        headerTitle:()=>(
          <Image
            style={{ height: 45, width: 45 }}
            source={require('../assets/Mercurial-trasparent.png')}
          />
        ),
        headerStyle: {
          backgroundColor: 'black',
        },
        headerRight:()=>{
          
        },
        headerLeft: ()=>{
          return <ProfilePicture/>

        }
      }}
      />
    </View>
    </QueryClientProvider>
  )
  
}