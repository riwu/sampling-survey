import React from 'react';
import Notifications from 'react-native-push-notification';
import { Platform, Linking, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import NotificationSettingsAndroid from 'react-native-permission-settings';
import OpenAppSettings from 'react-native-app-settings';
import getMatchingSchedule, { schedule } from './experiment/getMatchingSchedule';
import { postAll, experimentStarted } from './actions';
import { FIRST_EXPERIMENT_ROUTE } from './constants';

const showAlert = openSettings =>
  Alert.alert(
    'App notification is turned off',
    "Please enable notification to ensure that you don't miss sessions",
    [
      {
        text: 'Close',
      },
      {
        text: 'Open Settings',
        onPress: openSettings,
      },
    ],
  );

const checkPermissions = () => {
  if (Platform.OS === 'ios') {
    Notifications.checkPermissions(({ alert }) => {
      if (!alert) {
        showAlert(() => Linking.openURL('app-settings:'));
      }
    });
  } else {
    NotificationSettingsAndroid.areNotificationsEnabled((isEnabled) => {
      if (!isEnabled) {
        showAlert(() => OpenAppSettings.open());
      }
    });
  }
};

class RoutingScreen extends React.Component {
  componentWillMount() {
    const { props } = this;
    console.log('Mounting', props.route, props.notificationSchedule);

    if (!props.route) {
      console.log('new device');
      Notifications.cancelAllLocalNotifications();
      Actions.replace('InformationSheet');
      props.postAll();
      return;
    }

    let { route } = props;
    if (props.disqualified) {
      route = 'NotEligible';
    } else if (
      Object.keys(props.notificationSchedule).length > 0 &&
      props.route !== 'RewardScreen'
    ) {
      route = getMatchingSchedule(props.notificationSchedule, props.route);
      checkPermissions();
      if (
        route === FIRST_EXPERIMENT_ROUTE &&
        !(props.notificationSchedule[schedule] || {}).startTime
      ) {
        props.experimentStarted(schedule);
      }
    }
    console.log('replacing route', route);
    Actions.replace(route);
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  route: state.route,
  disqualified: state.disqualified,
  notificationSchedule: state.notificationSchedule,
});

export default connect(mapStateToProps, { postAll, experimentStarted }, null, {
  areStatesEqual: () => true,
})(RoutingScreen);
