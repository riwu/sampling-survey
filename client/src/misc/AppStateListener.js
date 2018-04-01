import React from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-native-push-notification';
import { AppState, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import TimerEnhance from 'react-native-smart-timer-enhance';
import MiddleText from '../components/MiddleText';
import getResponseRate from './getResponseRate';
import getMatchingSchedule from '../experiment/getMatchingSchedule';
import { scheduleNotification } from '../actions/getNotificationSchedule';
import { FIRST_EXPERIMENT_ROUTE } from '../constants';

const goToRoutingScreen = (state) => {
  console.log('state changed', state);
  if (state === 'active') {
    Actions.replace('RoutingScreen');
  }
};

class AppStateListener extends React.Component {
  componentDidMount() {
    console.log('mounting app listener', this.props.text.slice(0, 10));

    if (this.props.responseRate !== undefined) {
      // Finish or end of session screen
      console.log('setting app icon to 0');
      Notifications.setApplicationIconBadgeNumber(0);
      Notifications.cancelAllLocalNotifications();
      const futureSchedule = Object.keys(this.props.notificationSchedule)
        .map(time => Number(time))
        .filter(time => time > Date.now() + 3000);
      console.log('schedule', futureSchedule);
      scheduleNotification(futureSchedule);
    }

    AppState.addEventListener('change', goToRoutingScreen);
    this.timeout = this.setInterval(() => {
      const route = getMatchingSchedule(this.props.notificationSchedule, null, true);
      if (route === FIRST_EXPERIMENT_ROUTE) {
        clearInterval(this.timeout);
        Actions.replace('RoutingScreen');
      }
    }, 500);
  }
  componentWillUnmount() {
    console.log('unmounting app listener', this.props.text);
    AppState.removeEventListener('change', goToRoutingScreen);
    clearInterval(this.timeout);
  }
  render() {
    const { responseRate } = this.props;
    return (
      <MiddleText
        noPrevious
        text={
          <Text>
            {this.props.text +
              (responseRate === undefined ? '' : `\n\nYour response rate is ${responseRate}%.`)}
            {responseRate !== undefined &&
              responseRate < 50 && (
                <Text style={{ color: 'red' }}>
                  {'\n'}A response rate of 80% is required for reimbursement!
                </Text>
              )}
          </Text>
        }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  responseRate: ownProps.showResponseRate ? getResponseRate(state.experimentAnswers) : undefined,
  notificationSchedule: state.notificationSchedule,
});

export default connect(mapStateToProps)(TimerEnhance(AppStateListener));
