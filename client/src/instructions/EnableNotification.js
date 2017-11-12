import React from 'react';
import { Alert } from 'react-native';
import Notifications from 'react-native-push-notification';
import MiddleText from '../components/MiddleText';

async function getiOSNotificationPermission() {
  console.log('getting status');

  const granted = await new Promise((resolve) => {
    Notifications.checkPermissions(({ alert }) => {
      console.log('alert', alert);
      resolve(alert === 1);
    });
  });

  if (granted) return true;

  return new Promise((resolve) => {
    Notifications.requestPermissions(({ alert }) => {
      console.log('alert', alert);
      resolve(alert === 1);
    });
  });
}

// next scene must be named Finish to show finish button. Better design: pass as props
const EnableNotification = () => (
  <MiddleText
    text={
      'You will be prompted to allow notifications from the app.\n' +
      'Please press Allow so that the app can notify you for the tasks.\n\n' +
      'Press Next to continue.'
    }
    nextScene="Acknowledgement"
    noPrevious
    onPress={() => getiOSNotificationPermission().then((granted) => {
      console.log('granted', granted);
      if (granted) {
        return false;
      }
      Alert.alert('Please enable notification', 'Go to Settings > Find this app > Notifications > Allow Notifications');
      return true;
    })}
  />
);

export default EnableNotification;
