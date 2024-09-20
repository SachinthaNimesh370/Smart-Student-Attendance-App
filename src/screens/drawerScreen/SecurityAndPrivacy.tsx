import { View, Text } from 'react-native'
import React from 'react'

const SecurityAndPrivacy = ({ route }: any) => {
  const { userRegNo } = route.params;
  return (
    <View>
      <Text style={{fontSize:60,color:'black'}}>Security&Privacy</Text>
    </View>
  )
}

export default SecurityAndPrivacy