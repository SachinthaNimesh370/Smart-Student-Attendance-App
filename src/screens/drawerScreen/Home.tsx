import { View, Text, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

// Component to fetch and calculate attendance percentage
const AttendancePercentage = ({ userRegNo }: { userRegNo: string }) => {
  const [attendancePercentage, setAttendancePercentage] = useState<number | null>(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.153:8090/api/v1/student/getAttendanceByRegNo/${userRegNo}`);
        
        const attendanceData = response.data[0]; // Get the first object for this student
        
        let totalDays = 0;
        let presentDays = 0;

        // Loop through the keys of the attendance data
        for (let key in attendanceData) {
          if (key !== 'student_reg_no') {
            totalDays++;
            if (attendanceData[key] === true) {
              presentDays++;
            }
          }
        }

        if (totalDays > 0) {
          const percentage = (presentDays / totalDays) * 100;
          setAttendancePercentage(percentage);
        } else {
          setAttendancePercentage(0);
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, [userRegNo]);

  const chartData = attendancePercentage !== null ? [
    {
      name: 'Present',
      population: attendancePercentage,
      color: 'green',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Absent',
      population: 100 - attendancePercentage,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ] : [];

  return (
    <>
      {attendancePercentage !== null ? (
        <>
          <Text style={styles.percentage}>
            Attendance Percentage: {attendancePercentage.toFixed(2)}%
          </Text>
          <PieChart
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </>
      ) : (  
          <Text style={styles.loadingText}>Loading attendance data...</Text>        
      )}
    </>
  );
};

// Component to display user info and attendance
const UserInfo = ({ userRegNo }: any) => {
  return (
    <View >
      <Text style={styles.header}>Dashboard</Text>
      <Text style={styles.userRegNo}>User Registration No: {userRegNo}</Text>
      <AttendancePercentage userRegNo={userRegNo} />
    </View>
  );
};

// Main Home Component
const Home = ({ route }: any) => {
  const { userRegNo } = route.params;

  return (
    <View >
      <UserInfo userRegNo={userRegNo} />
    </View>
  );
};

const styles = StyleSheet.create({

  header: {
    fontSize: 60,
    color: 'black',
  },
  userRegNo: {
    fontSize: 20,
    color: 'black',
  },
  percentage: {
    fontSize: 24,
    marginTop: 20,
    color: 'green',
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
    
  },
});

export default Home;
