import { Link } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function ButtonContainer() {
  return (
    <View style={styles.container}>
      <Link href="/subjects" asChild
       style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? '#E5D9E4' : '#FFF' },
      ]}
      >
        <Pressable>
          <Text style={styles.text}>Subjects</Text>
        </Pressable>
      </Link>

      <Link href="/topics" asChild 
       style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? '#E5D9E4' : '#FFF' },
      ]}
      
      >
        <Pressable
          
        >
          <Text style={styles.text}>Topics</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
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
});