import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform, SafeAreaView } from 'react-native';
import * as Calendar from 'expo-calendar';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CalendarComponent({item, setModalVisible}) {
  const [status, requestPermission] = Calendar.useCalendarPermissions();
  const [granted, setGranted] = useState(false);
  const [calendarId, setCalendarId] = useState('');
  const [date, setDate] = useState(new Date(Date.now()));

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        if(calendars.length === 0){
          await createCalendar()
        }else{
          setCalendarId(calendars[0].id)
        }
         
        setGranted(true);
        
      }
    })();
  }, []);



  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  const createCalendar = async ()=>{
    if(!granted){
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        setGranted(true);
      }else{
        return alert('Calendar permission not granted')
      }
    }
    
    const defaultCalendarSource = Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Mercurial Notes' };

    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Mercurial Notes',
      color: '#DB1876',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'merurialnatescalendar',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    setCalendarId(newCalendarID)

  }

  const createEvent = async () => {
    if(!calendarId){
      await createCalendar()
      
    }
    try {
      const event = await Calendar.createEventAsync(calendarId, {
        title: item.tittle,
        startDate: date,
        endDate: date,
        timeZone: 'America/Mexico_City',
        notes: item.description,
        alarms: [{ method: Calendar.AlarmMethod.ALERT, absoluteDate: date }],
      })
      if(event){
        alert('Task added to calendar')
        setModalVisible(false)
      }else{
        alert('Error adding task to calendar')
      }
      
    } catch (error) {
      alert('Error adding task to calendar')
    }
   
    
  };

  const getDefaultCalendarSource = async () => {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add task to calendar</Text>
      <View style={styles.textView}>
        <Text style={styles.textInput}>{item.tittle}</Text>
      </View>
      
    <SafeAreaView style={styles.pickerView}>
    
        <DateTimePicker
        style={styles.datePicker}
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
          textColor='white'
          accentColor='#DB1876'
          
         

        />
        <DateTimePicker
        style={styles.datePicker}
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          onChange={onChange}
          textColor='white'
          accentColor='#DB1876'
        />
     
    </SafeAreaView>
    <View>
      <Button title="Add to calendar" onPress={createEvent} />
      <Button title="Cancel" onPress={()=> setModalVisible(false)} color={'red'} />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: '100%',
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
  },
  text:{
    color: 'white',
    fontSize: 20,
  },
  textInput:{
    color: '#DB1876',
    fontSize: 16,
  },
  datePicker:{
    color: 'white',
    borderRadius: 10,
  },
  pickerView:{
    backgroundColor: '#7A7A7A',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  textView:{
    width: 150,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});