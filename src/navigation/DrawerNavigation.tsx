import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Location from '../screens/Location';
import Home from '../screens/Home';



const Drawer = createDrawerNavigator();

const Drawer_Navigation = () => {
  return (
    
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Location" component={Location} />
      </Drawer.Navigator>
    
  )
}

export default Drawer_Navigation