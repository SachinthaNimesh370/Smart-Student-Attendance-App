import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Location from '../screens/Location';
import Home from '../screens/Home';



const Drawer = createDrawerNavigator();

const Drawer_Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Location" component={Location} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Drawer_Navigation