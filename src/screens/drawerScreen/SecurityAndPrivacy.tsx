import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

const SecurityAndPrivacy = ({ route }: any) => {
  const { userRegNo } = route.params;

  // State for Change Password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for Change Email
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');

  const handleChangePassword = () => {
    // Validate passwords
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    // Logic to handle password change
    console.log('Changing password for:', userRegNo);
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
    // You can add your API call here

    // Clear inputs after submission
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    Alert.alert('Success', 'Password changed successfully!');
  };

  const handleChangeEmail = () => {
    if (!oldEmail || !newEmail || !emailPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Logic to handle email change
    console.log('Changing email for:', userRegNo);
    console.log('Old Email:', oldEmail);
    console.log('New Email:', newEmail);
    console.log('Password for verification:', emailPassword);
    // You can add your API call here

    // Clear inputs after submission
    setOldEmail('');
    setNewEmail('');
    setEmailPassword('');
    Alert.alert('Success', 'Email changed successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Security & Privacy</Text>

      {/* Change Password Section */}
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Enter Old Password"
          placeholderTextColor="#888" // Custom placeholder color
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter New Password"
          placeholderTextColor="#888" // Custom placeholder color
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          placeholderTextColor="#888" // Custom placeholder color
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button title="Change Password" onPress={handleChangePassword} />
      </View>

      {/* Change Email Section */}
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Enter Old Email"
          placeholderTextColor="#888" // Custom placeholder color
          value={oldEmail}
          onChangeText={setOldEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter New Email"
          placeholderTextColor="#888" // Custom placeholder color
          value={newEmail}
          onChangeText={setNewEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password for Verification"
          placeholderTextColor="#888" // Custom placeholder color
          secureTextEntry
          value={emailPassword}
          onChangeText={setEmailPassword}
        />
        <Button title="Change Email" onPress={handleChangeEmail} />
      </View>
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
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: 'black', // Font color
  },
});

export default SecurityAndPrivacy;
