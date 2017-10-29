import React from 'react';
import { Permissions } from 'expo';
import { Alert } from 'react-native';
import MiddleText from '../components/MiddleText';
import api from '../api';

async function getiOSNotificationPermission() {
  console.log('getting status');
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status === 'granted') return true;
  const outcome = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  console.log('outcome', outcome);
  api.postInfo({
    status,
    outcome,
  });
  return outcome.status === 'granted';
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
