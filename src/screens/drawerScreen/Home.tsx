import { View, Text, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;
// NotificationDTO interface
interface NotificationDTO {
  id: number;
  date: string;
  time: string;
  notification: string;
}

const AttendancePercentage = ({ userRegNo }: { userRegNo: string }) => {
  const [attendancePercentage, setAttendancePercentage] = useState<number | null>(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.153:8090/api/v1/student/getAttendanceByRegNo/${userRegNo}`);
        const attendanceData = response.data.data[0];
        let totalDays = 0;
        let presentDays = 0;

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
    { name: 'Present', population: attendancePercentage, color: '#4CAF50', legendFontColor: '#333', legendFontSize: 10 },
    { name: 'Absent', population: 100 - attendancePercentage, color: '#F44336', legendFontColor: '#333', legendFontSize: 10 },
  ] : [];

  return (
    <View style={styles.pieChartContainer}>
      {attendancePercentage !== null ? (
        <>
          <PieChart
            data={chartData}
            width={screenWidth - 270}   // Adjusted width
            height={100}                // Adjusted height
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
          <Text style={styles.percentage}>Attendance Percentage: {attendancePercentage.toFixed(2)}%</Text>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading attendance data...</Text>
      )}
    </View>
  );
};

// Line chart component for attendance trends
const AttendanceTrend = () => {
  return (
    <View>
      <Text style={styles.chartTitle}>Attendance Trend</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{ data: [90, 85, 80, 88, 92, 85] }]
        }}
        width={screenWidth - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.lineChart}
      />
    </View>
  );
};

// Notification component
const LatestNotification = () => {
  const [latestNotification, setLatestNotification] = useState<NotificationDTO | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://192.168.0.153:8090/api/v1/student/getAllNotifications');
        const notifications = response.data;
        if (notifications.length > 0) {
          setLatestNotification(notifications[0]); // Display the latest notification (assuming the first is the latest)
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <View style={[styles.card ,{backgroundColor: '#fffce2'}]}>
      <Ionicons name="notifications-outline" size={40} color="#FF5722" />
      <Text style={styles.cardTitle}>Latest Notification</Text>
      {latestNotification ? (
        <>
          <Text style={styles.cardInfo}>Date: {latestNotification.date}</Text>
          <Text style={styles.cardInfo}>Time: {latestNotification.time}</Text>
          <Text style={styles.cardInfo}>Message: {latestNotification.notification}</Text>
        </>
      ) : (
        <Text style={styles.loadingText}>No notifications available</Text>
      )}
    </View>
  );
};

const Home = ({ route }: any) => {
  const { userRegNo } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="person-circle-outline" size={70} color="#333" />
        <Text style={styles.header}>Welcome, {userRegNo}</Text>
      </View>

      {/* Metrics Section */}
      <View style={styles.metricsContainer}>
        <View style={styles.card}>
          <Ionicons name="checkmark-done-outline" size={40} color="#4CAF50" />
          <Text style={styles.cardTitle}>Attendance</Text>
          <AttendancePercentage userRegNo={userRegNo} />
        </View>
        <View style={styles.card }>
          <Ionicons name="calendar-outline" size={40} color="#FF9800" />
          <Text style={styles.cardTitle}>Upcoming Assignment</Text>
          <Text style={styles.cardInfo}>No Assignment scheduled</Text>
        </View>
      </View>

      {/* Attendance Trend Chart */}
      <AttendanceTrend />

      {/* Latest Notification */}
      <LatestNotification />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#333',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5, // Increased for darker shadow
    shadowOffset: { width: 5, height: 5 }, // Increased width and height for larger shadow
    shadowRadius: 10, // Increased blur for a softer shadow
    elevation: 10, // Increased elevation for Android
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  cardInfo: {
    fontSize: 16,
    marginTop: 5,
    color: '#666',
  },
  percentage: {
    fontSize: 18,
    color: '#4CAF50',
    marginTop: 15,
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
    marginTop: 15,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  lineChart: {
    borderRadius: 10,
    marginBottom: 20,
  },
  pieChartContainer: {
    alignItems: 'center', // Center the pie chart and text
    marginBottom: 20,     // Add space between components
  },
});

export default Home;
