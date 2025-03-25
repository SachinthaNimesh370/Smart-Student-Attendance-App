import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraTesting = () => {
  const devices = useCameraDevices(); // Get available camera devices
  const [hasPermission, setHasPermission] = useState<'authorized' | 'denied' | 'not-determined' | 'restricted'>('not-determined'); // Track camera permission
  const [cameraVisible, setCameraVisible] = useState(false); // Control camera visibility

  // Get the front camera device, if available
  const device = devices.find(d => d.position === 'front'); // Find the front camera device

  // Request camera permission on component mount
  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission(); // Request permission

      // Map the permission result to our defined types
      switch (permission) {
        case 'granted':
          setHasPermission('authorized'); // Map 'granted' to 'authorized'
          break;
        case 'denied':
          setHasPermission('denied'); // Directly map 'denied'
          break;
        // case 'restricted':
        //   setHasPermission('restricted'); // Directly map 'restricted'
        //   break;
        default:
          setHasPermission('not-determined'); // Handle 'not-determined'
          break;
      }
    })();
  }, []);

  // If permission hasn't been granted, show a message based on the permission status
  if (hasPermission === 'restricted') {
    return (
      <View style={styles.container}>
        <Text>Camera access is restricted. Please check your settings.</Text>
      </View>
    );
  }

  if (hasPermission !== 'authorized') {
    return (
      <View style={styles.container}>
        <Text>No camera permission</Text>
        <Button
          title="Request Camera Permission"
          onPress={async () => {
            const permission = await Camera.requestCameraPermission(); // Request permission when button is pressed
            // Map the permission result again
            switch (permission) {
              case 'granted':
                setHasPermission('authorized');
                break;
              case 'denied':
                setHasPermission('denied');
                break;
            //   case 'restricted':
            //     setHasPermission('restricted');
            //     break;
              default:
                setHasPermission('not-determined');
                break;
            }
          }}
        />
      </View>
    );
  }

  // If no camera device is found, show an error message
  if (!device) {
    return (
      <View style={styles.container}>
        <Text>No Camera Found</Text>
        <Button title="No Camera Found" disabled />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Camera Testing</Text>
      {!cameraVisible ? (
        <Button title="Open Front Camera" onPress={() => setCameraVisible(true)} />
      ) : (
        <View style={styles.cameraContainer}>
          <Camera
            style={StyleSheet.absoluteFill} // Full-screen camera
            device={device}
            isActive={true} // Camera is active when rendered
          />
          <Button title="Close Camera" onPress={() => setCameraVisible(false)} />
        </View>
      )}
    </View>
  );
};

// Styles for container and camera view
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
});

export default CameraTesting;
