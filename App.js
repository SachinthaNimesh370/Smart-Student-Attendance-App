import * as React from 'react';
import { Button, View ,StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Drawer_Navigation from './src/navigation/DrawerNavigation';

export default function App() {
  return (
    <View style={sty.container}>
      <Drawer_Navigation/>
    </View>
    
  );
}
const sty =StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  

  }})