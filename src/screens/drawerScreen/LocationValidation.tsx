import React, { useState } from 'react';
import { Text, View, PermissionsAndroid, TouchableOpacity, Alert, Linking, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

type LocationValidation = {
    latitude: number;
    longitude: number;
  } | null;

const LocationValidation = () => {
    const [currentLocation, setCurrentLocation] = useState<LocationValidation>(null);

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
            title: 'Cool Photo App Location Permission',
            message: 'Cool Photo App needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const openMaps = () => {
      const { latitude, longitude } = currentLocation!;
      if (latitude && longitude) {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url);
      } else {
        Alert.alert('Location not available');
      }
    };

    return (
      <View style={sty.conteiner}>
        <Text style={sty.header}>Get Cordinate</Text>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            alignItems: 'center',

          }}>
          <Text style={{color:'black'}}>Latitude: {currentLocation ? currentLocation.latitude : 'Loading...'}</Text>
          <Text style={{color:'black'}}>Longitude: {currentLocation ? currentLocation.longitude : 'Loading...'}</Text>
        </View>
        {currentLocation ? (
          <TouchableOpacity onPress={openMaps}>
            <View style={sty.buttnArea} >
              <Text style={sty.buttn}>Open Map</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity  onPress={requestPermission}>
            <View  style={sty.buttnArea}>
              <Text style={sty.buttn}>Get Location</Text>
            </View>
          </TouchableOpacity>
        )}
        <Text>My App</Text>
      </View>
    );
}

const sty = StyleSheet.create({
    conteiner:{
      margin:10,
      backgroundColor:'black'
    },
    header:{
      fontWeight:'400',
      fontSize:40,
      marginVertical:20
    },
    buttnArea: {
      backgroundColor: 'blue',
      justifyContent:'center',
      marginVertical:30,
      marginHorizontal:150,
      borderRadius:5

    },
    buttn:{
      textAlign:'center',
      height:30,
      fontSize:20,


    }
  });

export default LocationValidation