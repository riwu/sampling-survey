import React from 'react';
import Notifications from 'react-native-push-notification';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import OpenNotification from 'react-native-open-notification';
import getMatchingSchedule, { schedule } from './experiment/getMatchingSchedule';
import { postAll, experimentStarted } from './actions';
import { FIRST_EXPERIMENT_ROUTE } from './constants';

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
            onPress: OpenNotification.open,
          },
        ],
      );
    }
  });
};

class RoutingScreen extends React.Component {
  componentDidMount() {
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
    // see https://github.com/react-navigation/react-navigation/issues/4032
    setTimeout(() => Actions.replace(route), 0);
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

export default connect(
  mapStateToProps,
  { postAll, experimentStarted },
  null,
  {
    areStatesEqual: () => true,
  },
)(RoutingScreen);
