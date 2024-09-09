import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Location from './screens/Location';
import './gesture-handler';
import { View } from 'react-native';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Location} />
    </Drawer.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    
      <View>
        <Location/>
      </View>
   
  );
}

export default App;




