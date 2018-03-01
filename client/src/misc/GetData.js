import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import Notifications from 'react-native-push-notification';
import MiddleText from '../components/MiddleText';
import { setCode, postAll } from '../actions';
import { isSingle } from '../questionnaire/isEligible';

class GetData extends React.Component {
  componentDidMount() {
    Notifications.setApplicationIconBadgeNumber(0);
    Notifications.cancelAllLocalNotifications();
  }

  render() {
    const { props } = this;
    return (
      <MiddleText
        text="Please enable Internet to allow data to be collected."
        nextScene="RewardScreen"
        noPrevious
        onPress={() =>
          props
            .postAll(true)
            .then((code) => {
              console.log('res', code);
              props.setCode(code);
              return false;
            })
            .catch((err) => {
              console.log('error', err.message);
              Alert.alert(
                'Error',
                `Failed to send data.\n${err.message || 'Make sure you have Internet connection!'}`,
              );
              return err;
            })
        }
      />
    );
  }
}

export default connect(null, { setCode, postAll })(GetData);
