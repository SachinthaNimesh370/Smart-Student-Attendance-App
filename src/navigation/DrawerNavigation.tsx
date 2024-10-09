import * as React from 'react';
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import Home from '../screens/drawerScreen/Home';
import MarkAttendance from '../screens/drawerScreen/MarkAttendance';
import AttendanceHistory from '../screens/drawerScreen/AttendanceHistory';
import SecurityAndPrivacy from '../screens/drawerScreen/SecurityAndPrivacy';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Update import
import Notification from '../screens/drawerScreen/Notification';

const Drawer = createDrawerNavigator();

const Drawer_Navigation = ({ route, navigation }: any) => {
  const { userRegNo } = route.params;

  // Custom drawer content
  const CustomDrawerContent = (props: any) => (
    <View style={styles.drawerContent}>
      <View style={styles.userInfoSection}>
        {/* Replacing the image with an Ionicons icon */}
        <Ionicons
          name="person-circle-outline" // Use your preferred Ionicon
          size={50} // Icon size
          color="#00213b" // Icon color
          style={styles.profileIcon} // Add styling
        />
        <Text style={styles.userRegNo}>User Reg No: {userRegNo}</Text>
      </View>

      {/* The default drawer items */}
      <DrawerItemList {...props} />

      {/* Log Out button at the bottom */}
      <View style={styles.logoutSection}>
        <DrawerItem
          label="Log Out"
          onPress={() => {
            // Handle log out logic here
            console.log('User logged out');
            navigation.navigate('Login'); // Navigate to login or any other screen on logout
          }}
          icon={({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={'#00213b'} />
          )}
          labelStyle={styles.logoutLabel} // Customizing font size and weight
        />
      </View>
    </View>
  );

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f2f5ff', // Background color of the drawer
          width: 300,
        },
        drawerActiveTintColor: '#2196F3', // Change this to your desired blue color
        drawerInactiveTintColor: '#333', // Color for inactive items
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom drawer content
    >
      <Drawer.Screen
        name="Dashboard"
        component={Home}
        initialParams={{ userRegNo }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={'#00213b'} />
          ),
          drawerLabelStyle: {
            color: '#00213b',
            fontSize:18 // Set your desired font color here (example: Tomato color)
          },
        }}
      />
      <Drawer.Screen
        name="Mark Attendance"
        component={MarkAttendance}
        initialParams={{ userRegNo }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="checkmark-circle-outline" size={size} color={'#00213b'} />
          ),
          drawerLabelStyle: {
            color: '#00213b',
            fontSize:18 // Set your desired font color here (example: Tomato color)
          },
        }}
      />
      <Drawer.Screen
        name="Attendance History"
        component={AttendanceHistory}
        initialParams={{ userRegNo }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={'#00213b'} />
          ),
          drawerLabelStyle: {
            color: '#00213b',
            fontSize:18 // Set your desired font color here (example: Tomato color)
          },
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        initialParams={{ userRegNo }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={'#00213b'} />
          ),
          drawerLabelStyle: {
            color: '#00213b',
            fontSize:18 // Set your desired font color here (example: Tomato color)
          },
        }}
      />  
      
      <Drawer.Screen
        name="Security & Privacy"
        component={SecurityAndPrivacy}
        initialParams={{ userRegNo }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="lock-closed-outline" size={size} color={'#00213b'} />
          ),
          drawerLabelStyle: {
            color: '#00213b',
            fontSize:18 // Set your desired font color here (example: Tomato color)
          },
        }}
      />
    </Drawer.Navigator>
  );
};

// Styles for the drawer content
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 30,
  },
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 40,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    // backgroundColor: '#a0d5ff',
    
    borderRadius: 5,
    shadowColor: 'black',
  },
  profileIcon: {
    marginRight: 15,
  },
  userRegNo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00213b',
  },
  logoutSection: {
    marginTop: 'auto', // Push it to the bottom
    borderTopWidth: 2,
    borderTopColor: '#ccc',
    
    borderRadius:5

  },
  logoutLabel: {
    fontSize: 18, // Customize font size here
    fontWeight: '600', // Customize font weight here
    paddingLeft:30,
    
    
  },
});

export default Drawer_Navigation;
