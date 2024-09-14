import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LocationValidation from '../screens/LocationValidation';
import Home from '../screens/Home';
import MarkAttendance from '../screens/MarkAttendance';
import AttendanceHistory from '../screens/AttendanceHistory';
import TimeTable from '../screens/TimeTable';
import SecurityAndPrivacy from '../screens/SecurityAndPrivacy';



const Drawer = createDrawerNavigator();

const Drawer_Navigation = () => {
  return (
    
      <Drawer.Navigator initialRouteName="Dashbord">
        <Drawer.Screen name="Dashbord" component={Home} />
        <Drawer.Screen name="Mark Attendance" component={MarkAttendance}/>
        <Drawer.Screen name="Attendance History" component={AttendanceHistory}/>
        <Drawer.Screen name="Time Table" component={TimeTable}/>
        <Drawer.Screen name="Location Validation" component={LocationValidation} />
        <Drawer.Screen name="Security & Privacy" component={SecurityAndPrivacy}/>
      </Drawer.Navigator>
    
  )
}

export default Drawer_Navigation