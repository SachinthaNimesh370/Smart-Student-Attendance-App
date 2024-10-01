import { View, Text, Alert, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

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

    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            locations.push({ latitude, longitude });
            resolve(null);
          },
          error => {
            Alert.alert('Error', error.message);
            resolve(null); // Resolve even on error to continue the loop
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
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
      console.log(response.data);
      Alert.alert(response.data);
    } catch (error: any) {
      console.error('Error while saving student:', error);
    }
  };

  return (
    <View style={sty.area}>
      <TouchableOpacity onPress={requestPermission} activeOpacity={0.5} disabled={loading} style={sty.button}>
        <View style={sty.signInButton}>
          <Icon name="power-outline" size={150} color="white" />
          {loading && (
            <ActivityIndicator size={350} color="#367cfe" style={sty.loadingIndicator} /> // Center loading icon
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
      <Text style={{ fontSize: 60, color: 'black' }}>Mark Attendance</Text>
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
    marginTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'relative', // Position for loading indicator
  },
  signInButton: {
    backgroundColor: '#367cfe',
    height: 260,
    width: 260,
    borderRadius: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    position: 'absolute', // Center the loading indicator
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    marginLeft: -175, // Adjust horizontally based on the size of the icon
    marginTop: -175, // Adjust vertically based on the size of the icon
    
  },
});

export default MarkAttendance;



// import { View, Text, Alert, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/Ionicons';
// import MapView, { Marker } from 'react-native-maps';
// import { PermissionsAndroid } from 'react-native';

// const Buttn = ({ userRegNo }: any) => {
//   type LocationValidation = {
//     latitude: number;
//     longitude: number;
//   } | null;

//   const [currentLocation, setCurrentLocation] = useState<LocationValidation>(null);
//   const [loading, setLoading] = useState(false); // Loading state
//   const [mapRegion, setMapRegion] = useState({
//     latitude: 37.78825, // Default latitude
//     longitude: -122.4324, // Default longitude
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

//   const currentDate = new Date();
//   const currentDateOnly = currentDate.toLocaleDateString();
//   const currentTime = currentDate.toLocaleTimeString();

//   useEffect(() => {
//     requestPermission();
//   }, []);

//   const getCurrentLocation = async (attendanceData: any) => {
//     setLoading(true); // Set loading to true when starting to get location

//     // Fetch location from Google Maps API
//     try {
//       const apiKey = 'AIzaSyBaJCEAUdYPHnuw2ux1mXhVutYRfyOXkAM'; // Replace with your Google Maps API key
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${mapRegion.latitude},${mapRegion.longitude}&key=${apiKey}`
//       );
      
//       if (response.data && response.data.results.length > 0) {
//         const location = response.data.results[0].geometry.location;
//         const roundedLatitude = parseFloat(location.lat.toFixed(5));
//         const roundedLongitude = parseFloat(location.lng.toFixed(5));

//         setCurrentLocation({
//           latitude: roundedLatitude,
//           longitude: roundedLongitude,
//         });

//         setMapRegion({
//           latitude: roundedLatitude,
//           longitude: roundedLongitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         });

//         // Update the attendance data with rounded location
//         attendanceData.location = [roundedLatitude, roundedLongitude];

//         // Send the rounded location to the backend
//         await saveStudent(attendanceData);
//       } else {
//         Alert.alert('Error', 'Unable to fetch location from Google Maps API');
//       }
//     } catch (error) {
//       console.error('Error fetching location:', error);
//       Alert.alert('Error', 'Could not retrieve your current location');
//     }

//     setLoading(false); // Set loading to false after the process is done
//   };

//   const requestPermission = async () => {
//     const attendanceData = {
//       studentRegNo: userRegNo,
//       time: currentTime,
//       date: currentDateOnly,
//       location: null, // Will be set after getting location
//       attendance: true,
//     };

//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Attendance App Location Permission',
//           message: 'Attendance App needs access to your location',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('You can use the location');
//         getCurrentLocation(attendanceData);  // Get location after permission granted
//       } else {
//         console.log('Location permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const saveStudent = async (attendanceData: any) => {
//     console.log(attendanceData);
//     try {
//       const response = await axios.post('http://192.168.8.124:8090/api/v1/student/attendMark', attendanceData);
//       console.log(response.data);
//       Alert.alert(response.data);
//     } catch (error: any) {
//       console.error('Error while saving student:', error);
//     }
//   };

//   return (
//     <View style={sty.area}>
//       <TouchableOpacity onPress={requestPermission} activeOpacity={0.5} disabled={loading} style={sty.button}>
//         <View style={sty.signInButton}>
//           <Icon name="power-outline" size={150} color="white" />
//           {loading && (
//             <ActivityIndicator size={350} color="#367cfe" style={sty.loadingIndicator} /> // Center loading icon
//           )}
//         </View>
//       </TouchableOpacity>

//       {/* Display Map */}
//       {currentLocation && (
//         <MapView
//           style={sty.map}
//           region={mapRegion}
//           showsUserLocation={true}
//         >
//           <Marker
//             coordinate={currentLocation}
//             title="You are here"
//             description="Your current location"
//           />
//         </MapView>
//       )}
//     </View>
//   );
// };

// const MarkAttendance = ({ route }: any) => {
//   const { userRegNo } = route.params;
//   return (
//     <View style={sty.container}>
//       <Text style={{ fontSize: 60, color: 'black' }}>Mark Attendance</Text>
//       <Buttn userRegNo={userRegNo} />
//     </View>
//   );
// };

// const sty = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   area: {
//     marginTop: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     position: 'relative', // Position for loading indicator
//   },
//   signInButton: {
//     backgroundColor: '#367cfe',
//     height: 260,
//     width: 260,
//     borderRadius: 260,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingIndicator: {
//     position: 'absolute', // Center the loading indicator
//     top: '50%', // Center vertically
//     left: '50%', // Center horizontally
//     marginLeft: -175, // Adjust horizontally based on the size of the icon
//     marginTop: -175, // Adjust vertically based on the size of the icon
//   },
//   map: {
//     width: '100%',
//     height: 300, // Height of the map
//     marginTop: 20,
//   },
// });

// export default MarkAttendance;
