import Notifications from 'react-native-push-notification';
import { Platform, Linking, Alert } from 'react-native';
import OpenNotification from 'react-native-open-notification';
import getMatchingSchedule, { schedule } from '../experiment/getMatchingSchedule';
import { postAll, experimentStarted } from '../actions';
import { FIRST_EXPERIMENT_ROUTE } from '../constants';
import store from '../store';

const checkPermissions = () => {
  Notifications.checkPermissions(({ alert }) => {
    console.log('Notification permission', alert);
    if (!alert) {
      Alert.alert(
        'App notification is turned off',
        "Please enable notification to ensure that you don't miss sessions",
        [
          {
            text: 'Close',
          },
          {
            text: 'Open Settings',
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                OpenNotification.open();
              }
            },
          },
        ],
      );
    }
  });
};

const getNextRoute = () => {
  const state = store.getState();
  console.log('Mounting', state.route, state.notificationSchedule);

  if (!state.route) {
    console.log('new device');
    Notifications.cancelAllLocalNotifications();
    store.dispatch(postAll());
    return 'InformationSheet';
  }

  let { route } = state;
  if (state.disqualified) {
    route = 'NotEligible';
  } else if (Object.keys(state.notificationSchedule).length > 0 && state.route !== 'RewardScreen') {
    route = getMatchingSchedule(state.notificationSchedule, state.route);
    checkPermissions();
    if (
      route === FIRST_EXPERIMENT_ROUTE &&
      !(state.notificationSchedule[schedule] || {}).startTime
    ) {
      store.dispatch(experimentStarted(schedule));
    }
  }
  console.log('replacing route', route);
  return route;
};

export default getNextRoute;
