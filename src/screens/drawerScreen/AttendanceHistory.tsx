import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceHistory = ({ route }: any) => {
  const { userRegNo } = route.params;  // Get the regNo passed via route
  const [attendanceData, setAttendanceData] = useState([]);  // State for storing attendance data
  const [loading, setLoading] = useState(true);  // State to manage loading

  // Function to fetch attendance data from the backend
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`http://192.168.8.124:8090/api/v1/student/getAttendanceByRegNo/${userRegNo}`);
      setAttendanceData(response.data);  // Set the retrieved data in state
      setLoading(false);  // Stop loading once data is fetched
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setLoading(false);  // Stop loading even if there's an error
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Attendance Data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance History for {userRegNo}</Text>

      {/* Display attendance data */}
      {attendanceData.length > 0 ? (
        <FlatList
          data={attendanceData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {/* Loop through all keys dynamically, starting from the second key */}
              {Object.entries(item).slice(1).map(([key, value], index) => (  // Skip the first key-value pair
                <View key={index} style={styles.row}>
                  <Text style={styles.keyText}>{key}:</Text>
                  <Text style={[styles.valueText, { color: (typeof value === 'boolean' || value === null) ? (value ? 'green' : 'red') : '#333' }]}>
                    {/* Check if value is boolean or null */}
                    {typeof value === 'boolean' || value === null
                      ? value ? 'Present' : 'Absent'
                      : String(value)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        />
      ) : (
        <Text style={styles.text}>No attendance data available.</Text>
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  keyText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  valueText: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AttendanceHistory;
