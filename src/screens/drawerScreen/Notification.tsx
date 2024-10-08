import { View, Text } from 'react-native'
import React from 'react'

const TimeTable = ({ route }: any) => {
  const { userRegNo } = route.params;
  return (
    <View>
      <Text style={{fontSize:60,color:'black'}}>TimeTable</Text>
    </View>
  )
}

export default TimeTable