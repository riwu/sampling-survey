import React from 'react';
import { Platform } from 'react-native';
import { Notifications } from 'react-native-push-notification';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import getMatchingSchedule from './experiment/getMatchingSchedule';

class RoutingScreen extends React.Component {
  componentWillMount() {
    const props = this.props;
    console.log('Mounting', props.route, props.schedule, Platform);

    if (!props.route) {
      console.log('new device');
      Notifications.cancelAllScheduledNotificationsAsync();
      Actions.replace('InformationSheet'); //        Acknowledgement
      return;
    }

    if (Platform.OS === 'android') {
      console.log('dismissing android notifications');
      Notifications.dismissAllNotificationsAsync();
    } else if (Platform.OS === 'ios') {
      // this trick clears local notifications
      console.log('dismissing ios notifications');
      Notifications.setBadgeNumberAsync(1).then(() => Notifications.setBadgeNumberAsync(0));
    }

    let route = props.route;
    if (props.disqualified) {
      route = 'NotEligible';
    } else if (Object.keys(props.schedule).length > 0 && props.route !== 'RewardScreen') {
      route = getMatchingSchedule(props.schedule, props.route);
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
  schedule: state.notificationSchedule,
});

export default connect(mapStateToProps)(RoutingScreen);
