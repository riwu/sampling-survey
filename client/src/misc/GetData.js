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
    onPress={() => api.postAll(state).then(() => false).catch((err) => {
      Alert.alert('Error', Object.keys(err || {}).length === 0
        ? 'Failed to send data.\nMake sure you have Internet connection!'
        : JSON.stringify(err));
      console.log(err);
      return err;
    })}
  />
);

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(GetData);
