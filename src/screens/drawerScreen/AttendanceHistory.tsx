import { View, Text } from 'react-native'
import React from 'react'

const AttendanceHistory = ({ route }: any) => {
  const { userRegNo } = route.params;
  return (
    <View>
      <Text style={{fontSize:60,color:'black'}}>AttendanceHistory</Text>
    </View>
  )
}

export default AttendanceHistory