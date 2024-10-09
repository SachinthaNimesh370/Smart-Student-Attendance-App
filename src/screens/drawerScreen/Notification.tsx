import { View, Text } from 'react-native'
import React from 'react'

const Notification = ({ route }: any) => {
  const { userRegNo } = route.params;
  return (
    <View>
      <Text style={{fontSize:60,color:'black'}}>Notification</Text>
    </View>
  )
}

export default Notification