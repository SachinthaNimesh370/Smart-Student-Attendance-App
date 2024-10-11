import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

// Define the structure of your notification object
interface NotificationDTO {
  id: number;
  date: string;
  time: string;
  notification: string;
}

const Notification = ({ route }: any) => {
  const { userRegNo } = route.params;
  
  // Define the state type as an array of NotificationDTO
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch notifications from your backend API
    fetch('http://192.168.0.153:8090/api/v1/student/getAllNotifications')
      .then((response) => response.json())
      .then((data: NotificationDTO[]) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {notifications.length === 0 ? (
        <Text style={styles.noData}>No notifications available</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text style={styles.notificationDate}>{item.date}</Text>
              <Text style={styles.notificationTime}>{item.time}</Text>
              <Text style={styles.notificationText}>{item.notification}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  noData: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
  },
  notificationItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4, // for Android shadow
  },
  notificationText: {
    fontSize: 16,
    color: '#34495e',
    marginTop: 5,
    fontWeight: '400',
  },
  notificationDate: {
    fontSize: 14,
    color: '#95a5a6',
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 14,
    color: '#95a5a6',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Notification;
