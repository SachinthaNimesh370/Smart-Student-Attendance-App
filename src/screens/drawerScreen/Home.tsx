import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet } from 'react-native';

const Home = ({ route }: any) => {
  const { userRegNo } = route.params;
  const [attendancePercentage, setAttendancePercentage] = useState<number | null>(null);

  useEffect(() => {
    // Function to calculate attendance percentage
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.153:8090/api/v1/student/getAttendanceByRegNo/${userRegNo}`);
        
        const attendanceData = response.data[0]; // Get the first object for this student
        
        // Initialize counters for total days and present days
        let totalDays = 0;
        let presentDays = 0;

        // Loop through the keys of the attendance data
        for (let key in attendanceData) {
          // Skip the 'student_reg_no' field
          if (key !== 'student_reg_no') {
            totalDays++; // Increment total days count

            // Check if the value is `true` (present)
            if (attendanceData[key] === true) {
              presentDays++; // Increment present days count
            }
          }
        }

        // Calculate the percentage
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

    // Fetch attendance data on component mount
    fetchAttendanceData();
  }, [userRegNo]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <Text style={styles.userRegNo}>User Registration No: {userRegNo}</Text>
      
      {attendancePercentage !== null ? (
        <Text style={styles.percentage}>
          Attendance Percentage: {attendancePercentage.toFixed(2)}%
        </Text>
      ) : (
        <Text style={styles.loadingText}>Loading attendance data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
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
