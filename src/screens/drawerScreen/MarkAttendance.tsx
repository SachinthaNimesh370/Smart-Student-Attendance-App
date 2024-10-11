import { View, Text, Alert, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

const cameraPermission = Camera.getCameraPermissionStatus()


const Buttn = ({ userRegNo }: any) => {
  type LocationValidation = {
    latitude: number;
    longitude: number;
  } | null;

  const [currentLocation, setCurrentLocation] = useState<LocationValidation>(null);
  const [loading, setLoading] = useState(false); // Loading state

  const currentDate = new Date();
  const currentDateOnly = currentDate.toLocaleDateString();
  const currentTime = currentDate.toLocaleTimeString();

  const getCurrentLocation = async (attendanceData: any) => {
    const locations: { latitude: number; longitude: number }[] = [];
    setLoading(true); // Set loading to true when starting to get location

    for (let i = 0; i < 5; i++) { // Increased the number of location samples to 15
      await new Promise((resolve) => {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            locations.push({ latitude, longitude });
            resolve(null);
          },
          error => {
            // Alert.alert('Error', error.message); // Alert error message
            resolve(null); // Resolve even on error to continue the loop
          },
          {
            enableHighAccuracy: true, // Highest possible accuracy
            timeout: 10000, // Increased timeout to allow more accurate readings
            maximumAge: 0, // No cached data, force a fresh location
            distanceFilter: 0, // Track location even with small movements
          }
        );
      });

      // Wait for 1 second before the next location fetch
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Calculate average location
    const avgLocation = getAverageLocation(locations);

    // Round to 5 decimal places
    const roundedLatitude = parseFloat(avgLocation.latitude.toFixed(5));
    const roundedLongitude = parseFloat(avgLocation.longitude.toFixed(5));

    setCurrentLocation({
      latitude: roundedLatitude,
      longitude: roundedLongitude,
    });

    // Update the attendance data with rounded location
    attendanceData.location = [roundedLatitude, roundedLongitude];

    // Send the rounded location to the backend
    await saveStudent(attendanceData);
    setLoading(false); // Set loading to false after the process is done
  };

  // Function to calculate average location
  const getAverageLocation = (locations: { latitude: number; longitude: number }[]) => {
    if (locations.length === 0) return { latitude: 0, longitude: 0 };

    const sum = locations.reduce((acc, loc) => {
      return {
        latitude: acc.latitude + loc.latitude,
        longitude: acc.longitude + loc.longitude,
      };
    }, { latitude: 0, longitude: 0 });

    return {
      latitude: sum.latitude / locations.length,
      longitude: sum.longitude / locations.length,
    };
  };

  const requestPermission = async () => {
    const attendanceData = {
      studentRegNo: userRegNo,
      time: currentTime,
      date: currentDateOnly,
      location: null, // Will be set after getting location
      attendance: true,
    };

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Attendance App Location Permission',
          message: 'Attendance App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getCurrentLocation(attendanceData);  // Get location after permission granted
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const saveStudent = async (attendanceData: any) => {
    console.log(attendanceData);
    try {
      const response = await axios.post('http://192.168.0.153:8090/api/v1/student/attendMark', attendanceData);
      Alert.alert( response.data.data); // Ensure text is wrapped in <Text>
    } catch (error: any) {
      console.error('Error while saving student:', error);
      Alert.alert('Error', 'Could not save attendance data.'); // Ensure error is also wrapped
    }
  };


  return (
    <View style={sty.area}>
      
      
      <TouchableOpacity onPress={requestPermission} activeOpacity={0.5} disabled={loading} style={sty.button}>
        <View style={sty.signInButton}>
          
          <Icon name="power-outline" size={30} color="white" />
          <Text style={sty.txt}>Mark Attendance</Text>
          {loading && (
            <ActivityIndicator size={350} color="#2471ff" style={sty.loadingIndicator} /> // Center loading icon
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const MarkAttendance = ({ route }: any) => {
  const { userRegNo } = route.params;
  return (
    <View style={sty.container}>
      {/* <Text style={{ fontSize: 60, color: 'black' }}>Mark Attendance</Text> */}
      <Buttn userRegNo={userRegNo} />
    </View>
  );
};

const sty = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  area: {
    marginTop: 550,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'relative', // Position for loading indicator
    
  },
  signInButton: {
    backgroundColor: '#367cfe',
    height: 60,
    width: 400,
    borderRadius: 5,
    //  justifyContent: 'center',
      paddingLeft:100,
    //  flex:1,
     flexDirection:'row',
    alignItems: 'center',
    
  },
  txt:{
    fontSize:20,
    paddingLeft:20,
    color:'white'
  },

  loadingIndicator: {
    position: 'absolute', // Center the loading indicator
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    marginLeft: -138, // Adjust horizontally based on the size of the icon
    marginTop: -400, // Adjust vertically based on the size of the icon
  },
});

export default MarkAttendance;
