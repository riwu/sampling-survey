import React from 'react';
import { Alert, Linking } from 'react-native';
import Notifications from 'react-native-push-notification';
import MiddleText from '../components/MiddleText';

function getiOSNotificationPermission() {
  console.log('getting permission');
  return Notifications.requestPermissions().then(({ alert }) => alert === 1);
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
    onPress={() =>
      getiOSNotificationPermission().then((granted) => {
        console.log('granted', granted);
        if (granted) {
          return false;
        }
        Alert.alert(
          'Please enable notification',
          'Go to Settings > Find this app > Notifications > Allow Notifications',
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openURL('app-settings:'),
            },
          ],
        );
        return true;
      })
    }
  />
);

export default EnableNotification;
