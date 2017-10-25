import React from 'react';
import { Platform } from 'react-native';
import { Notifications } from 'expo';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import TimerEnhance from 'react-native-smart-timer-enhance';
import getMatchingSchedule from './experiment/getMatchingSchedule';

class RoutingScreen extends React.Component {
  componentDidMount() {
    console.log('Mounting', this.props.route, this.props.schedule);

    if (Platform === 'android') {
      Notifications.dismissAllNotificationsAsync();
    } else if (Platform === 'ios') {
      // this trick clears local notifications
      Notifications.setBadgeNumberAsync(1).then(() => Notifications.setBadgeNumberAsync(0));
    }
    if (Object.keys(this.props.schedule).length > 0) {
      const route = getMatchingSchedule(this.props.schedule).route;
      console.log('replacing at didMount', route);
      Actions.replace(route);
      return;
    }
    this.timeout = this.setTimeout(() => {
      console.log('Going to information sheet');
      Notifications.cancelAllScheduledNotificationsAsync();
      Actions.replace('InformationSheet'); //    Acknowledgement
    }, 1000);
  }

  componentWillReceiveProps(props) {
    console.log('receiving props', props.route, props.schedule);
    clearTimeout(this.timeout);
    let route;
    if (props.disqualified) {
      route = 'NotEligible';
    } else if (Object.keys(props.schedule).length === 0) {
      route = props.route;
    } else {
      route = getMatchingSchedule(props.schedule).route;
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

export default connect(mapStateToProps)(TimerEnhance(RoutingScreen));
