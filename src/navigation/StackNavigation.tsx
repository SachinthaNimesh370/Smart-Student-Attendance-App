import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/stackScreen/Login';
import Drawer_Navigation from './DrawerNavigation';
import SignUp from '../screens/stackScreen/SignUp';


const StackNavigation = () => {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer >
          <Stack.Navigator screenOptions={{headerShown:false}}>
              <Stack.Screen name="Login" component={Login} options={
                  {cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}
              }/>
              <Stack.Screen name="SignUp" component={SignUp} options={
                  {cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}
              }/>
              
              <Stack.Screen name="Drawer" component={Drawer_Navigation} options={
                  {cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}
              } />
  
          </Stack.Navigator>
          
      </NavigationContainer>
    )
}

export default StackNavigation