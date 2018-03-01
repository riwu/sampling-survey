import React from 'react';
import Notifications from 'react-native-push-notification';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import getMatchingSchedule from './experiment/getMatchingSchedule';

class RoutingScreen extends React.Component {
  componentWillMount() {
    const { props } = this;
    console.log('Mounting', props.route, props.schedule);

    if (!props.route) {
      console.log('new device');
      Notifications.cancelAllLocalNotifications();
      Actions.replace('InformationSheet');
      return;
    }

    let { route } = props;
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
