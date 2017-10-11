import React from 'react';
import { connect } from 'react-redux';
import RadioOptions from '../components/RadioOptionsContainer';
import Question from '../components/Question';
import { scheduleNotification } from '../actions';

const questionProps = {
  header: 'Acknowledgement',
  question: 'I acknowledge that a response rate of >80%' +
  ' in the subsequent tasks is required for me to receive reimbursement',
  responseComponent: (
    <RadioOptions
      disableIfLast
      radio_props={['Yes', 'No'].map(option => ({
        label: option,
      }))}
    />
  ),
};

const Acknowledgement = props => (
  <Question
    {...props}
    {...questionProps}
    onPress={scheduleNotification}
  />
);

export default connect(null, { scheduleNotification })(Acknowledgement);
