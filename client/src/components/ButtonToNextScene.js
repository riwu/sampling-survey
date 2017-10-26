import React from 'react';
import { Permissions } from 'expo';
import { StyleSheet, View, Alert, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from './Button';
import { getNextScene } from '../experiment/getMatchingSchedule';

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

async function getiOSNotificationPermission() {
  console.log('getting status');
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status === 'granted') return true;
  const outcome = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  console.log('outcome', outcome);
  return outcome.status === 'granted';
}

// next scene must be named Finish to show finish button. Better design: pass as props
const ButtonToNextScene = ({ nextScene, disabled, previousScene, onPress, startTime }) => (
  <View style={styles.buttons}>
    {previousScene &&
      <Button
        onPress={() => Actions.replace(previousScene)}
        text="Back"
      />}
    {nextScene &&
      <Button
        onPress={() => {
          if (onPress) onPress();
          if (nextScene === 'Acknowledgement' && Platform.OS === 'ios') {
            getiOSNotificationPermission().then((granted) => {
              console.log('granted', granted);
              if (granted) {
                Actions.replace(getNextScene(nextScene, startTime));
              } else {
                Alert.alert('Please enable notification', 'Go to Settings > Find this app > Notifications > Allow Notifications');
              }
            });
            return;
          }
          Actions.replace(getNextScene(nextScene, startTime));
        }}
        text={nextScene === 'Finish' ? 'Finish' : 'Next'}
        disabled={disabled}
      />}
  </View>
);

export default ButtonToNextScene;
