import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import MiddleText from '../components/MiddleText';
import api from '../api';

const GetData = ({ state }) => (
  <MiddleText
    text="Please enable Internet to allow data to be collected."
    nextScene="RewardScreen"
    noPrevious
    onPress={() => api.postAll(state).then((res) => {
      console.log('res', res);
      return false;
    }).catch((err) => {
      console.log('error', err.message);
      Alert.alert('Error', `Failed to send data.\n${err.message || 'Make sure you have Internet connection!'}`);
      return err;
    })}
  />
);

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(GetData);
