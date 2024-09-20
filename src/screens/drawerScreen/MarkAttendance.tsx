import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

type LocationValidation = {
  latitude: number;
  longitude: number;
} | null;
const Buttn =({ userRegNo }: any)=>{
  const [currentLocation, setCurrentLocation] = useState<LocationValidation>(null);
  console.log(currentLocation?.latitude+"New")

  
  const currentDate = new Date();
  const currentDateOnly = currentDate.toLocaleDateString(); 
  const currentTime = currentDate.toLocaleTimeString();

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        console.log(latitude, longitude);
      },
      error => Alert.alert('Error', error.message),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Attendance App Location Permission',
          message: 'Attendance App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getCurrentLocation();
        saveStudent(attendanceData);
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
    
  const attendanceData = {

    studentRegNo: userRegNo,
    time: currentTime,
    date:  currentDateOnly,
    location: [currentLocation?.latitude,currentLocation?.longitude],
    attendance: true
  };

  const saveStudent = async (attendanceData:any) => {
    console.log(attendanceData)
      try {
        const response = await axios.post('http://192.168.8.124:8090/api/v1/student/attendMark', attendanceData); 
        console.log(response.data);
        Alert.alert(response.data);
    } catch (error) {
      console.error('Error while saving student:', error);
    }
  };
  return(
<View style={sty.area}>
      <TouchableOpacity onPress={() =>requestPermission() } activeOpacity={0.5}>
        <View style={sty.signInButton}>
          <Icon name="power-outline" size={150} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const MarkAttendance = ({ route }: any) => {
  const { userRegNo } = route.params;
  return (
    <View style={sty.container}>
      <Text style={{fontSize:60,color:'black'}}>MarkAttendance</Text>
      <Buttn  userRegNo={userRegNo} />
    </View>
  )
}

const sty =StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  area:{
    marginTop:200,
    justifyContent:'center',
    alignItems:'center'
   
  },

  signInButton:{
    backgroundColor:'#367cfe',
    height:260,
    width:260,
    borderRadius:260,
    justifyContent:'center',
    alignItems:'center'
  }
  
})

export default MarkAttendance