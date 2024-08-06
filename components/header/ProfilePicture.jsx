import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { getImage } from '../../lib/queries';

export default function ProfilePicture() {
  const [userImage, setUserImage] = useState('');
  useEffect(()=>{
    const fetchImage = async () => {
      try {
        const image = await getImage();
        setUserImage(image);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  },[])
  return (
    <View style={styles.container}>
      <Link href={'/user'} asChild>
      <Pressable>
        <Image source={{uri:`${userImage || 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'}`}} style={styles.image}/>
      </Pressable>
      </Link>
    </View>
  );
  
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    bottom:0,
    backgroundColor: '#0d0d0d',
    height:45,
    width:45
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },

})