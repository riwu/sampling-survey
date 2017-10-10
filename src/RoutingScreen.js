import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class RoutingScreen extends React.Component {
  componentDidMount() {
    this.timeout = setTimeout(() => Actions.replace('InformationSheet'), 1000);
  }

  componentWillReceiveProps(props) {
    clearTimeout(this.timeout);
    let route;
    if (props.disqualified) {
      route = 'NotEligible';
    } else if (props.schedule.length === 0) {
      route = props.route;
    } else {
      const diff = Date.now() - props.schedule[0];
      if (diff > 0 && diff < 30 * 60000) {
        route = 'Question 1';
      } else {
        route = 'NotReady';
      }
    }
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
