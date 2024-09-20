import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';


const Buttn =({ userRegNo }: any)=>{
  const currentDate = new Date();
  const currentDateOnly = currentDate.toLocaleDateString(); 
  const currentTime = currentDate.toLocaleTimeString();
  
    
  const attendanceData = {

    studentRegNo: userRegNo,
    time: currentTime,
    date:  currentDateOnly,
    location: [2.0010,8.124],
    attendance: true
  };

  const saveStudent = async (attendanceData:any) => {
    console.log(attendanceData)
      try {
        const response = await axios.post('http://192.168.8.124:8090/api/v1/student/attendMark', attendanceData); 
        console.log(response.data);
        // Alert.alert("Attendance Marked !","nulll");
        Alert.alert(response.data);
    } catch (error) {
      console.error('Error while saving student:', error);
    }
  };
  return(
<View>
      <TouchableOpacity onPress={() => saveStudent(attendanceData)} activeOpacity={0.5}>
        <View style={sty.signInButton}>
          <Icon name="arrow-forward-sharp" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const MarkAttendance = ({ route }: any) => {
  const { userRegNo } = route.params;
  return (
    <View>
      <Text style={{fontSize:60,color:'black'}}>MarkAttendance</Text>
      <Buttn  userRegNo={userRegNo} />
    </View>
  )
}

const sty =StyleSheet.create({

  signInButton:{
    backgroundColor:'#367cfe',
    height:60,
    width:60,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center'
  }
  
})

export default MarkAttendance