import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import Notifications from 'react-native-push-notification';
import MiddleText from '../components/MiddleText';
import api from '../actions/api';
import { setCode } from '../actions';

class GetData extends React.Component {
  componentDidMount() {
    Notifications.setApplicationIconBadgeNumber(0);
    Notifications.cancelAllLocalNotifications();
  }

  render() {
    const { state, ...props } = this.props;
    return (
      <MiddleText
        text="Please enable Internet to allow data to be collected."
        nextScene="RewardScreen"
        noPrevious
        onPress={() => api.postAll(state).then((code) => {
          console.log('res', code);
          props.setCode(code);
          return false;
        }).catch((err) => {
          console.log('error', err.message);
          Alert.alert('Error', `Failed to send data.\n${err.message || 'Make sure you have Internet connection!'}`);
          return err;
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, { setCode })(GetData);
