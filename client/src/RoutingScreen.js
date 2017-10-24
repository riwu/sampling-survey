import React from 'react';
import { Notifications } from 'expo';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import TimerEnhance from 'react-native-smart-timer-enhance';
import getMatchingSchedule from './experiment/getMatchingSchedule';

class RoutingScreen extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.schedule).length > 0) {
      console.log('replacing at will mount');
      Actions.replace(getMatchingSchedule(this.props.schedule).route);
    }
  }

  componentDidMount() {
    console.log('Mounting', this.props);

    this.timeout = this.setTimeout(() => {
      console.log('Going to information sheet');
      Notifications.cancelAllScheduledNotificationsAsync();
      Actions.replace('InformationSheet'); //  Acknowledgement
    }, 1000);
  }

  componentWillReceiveProps(props) {
    console.log('receiving props', props);
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
