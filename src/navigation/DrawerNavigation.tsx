import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LocationValidation from '../screens/drawerScreen/LocationValidation';
import Home from '../screens/drawerScreen/Home';
import MarkAttendance from '../screens/drawerScreen/MarkAttendance';
import AttendanceHistory from '../screens/drawerScreen/AttendanceHistory';
import TimeTable from '../screens/drawerScreen/TimeTable';
import SecurityAndPrivacy from '../screens/drawerScreen/SecurityAndPrivacy';



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