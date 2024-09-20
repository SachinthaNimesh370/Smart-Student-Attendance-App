import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';


// Example usage





const Home = ({ route }: any) => {
   const { userRegNo } = route.params;
  return (
    <View>
      <Text style={{fontSize:60,color:'black'}}>Dashbord</Text>
      <Text style={{color:'black'}}>{userRegNo}</Text>
    
    </View>
  )
}



export default Home