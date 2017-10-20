import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import getMatchingSchedule from './experiment/getMatchingSchedule';

class RoutingScreen extends React.Component {
  componentDidMount() {
    console.log('Mounting', this.props);
    this.timeout = setTimeout(() => {
      console.log('Going to information sheet');
      Actions.replace('InformationSheet');
    }, 1000);
  }

  componentWillReceiveProps(props) {
    console.log('receiving props', props.schedule);
    clearTimeout(this.timeout);
    let route;
    if (props.disqualified) {
      route = 'NotEligible';
    } else if (props.schedule.length === 0) {
      route = props.route;
    } else {
      const schedule = getMatchingSchedule(props.schedule);
      console.log('Schedule', schedule);
      if (schedule && !Object.keys(props.experimentAnswers).includes(String(schedule))) {
        console.log('Time diff', Date.now() - schedule <= 30 * 60000);
        if (Date.now() - schedule <= 30 * 60000) {
          route = 'Question 1';
        } else {
          route = 'SessionTimeOut';
        }
      } else {
        route = 'NotReady';
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
  schedule: state.notificationSchedule,
  experimentAnswers: state.experimentAnswers,
});

export default connect(mapStateToProps)(RoutingScreen);
