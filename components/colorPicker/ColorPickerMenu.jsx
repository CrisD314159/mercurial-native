import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

export default function ColorPickerMenu({color, serColor, setModalVisible}) {

  const handleValueChange = (itemValue) => {
    serColor(itemValue);
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerCont}>
        <Text style={styles.label}>Select Color</Text>
        <ColorPicker
          color={color}
          onColorChange={(color) => handleValueChange(color)}
          thumbSize={30}
          sliderSize={30}
          noSnap={true}
          row={false}
        />
        

        <Pressable style={({pressed})=>[styles.button, {backgroundColor: pressed? '#4D1EE5': '#3856E5'}]}
          onPress={()=> setModalVisible(false)}
          >
          <Text style={styles.text}>Done</Text>
        </Pressable>

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    position: 'absolute',
    width: '100%',
    height: '80%',
    bottom:0,
    backgroundColor: '#0d0d0d',
  },
  label: {
    fontSize: 18,
    color: 'white',

  },
  picker: {
    width: 250,
    color: 'white',
  },
  text: {
    fontSize: 16,
    color:'white'
  },
  button:{
    width: 150,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25
  },
  pickerCont:{
    marginTop: 20,
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  pickerItem:{
    color: 'white',
    fontSize: 16,
    backgroundColor: 'blue'

  },
});