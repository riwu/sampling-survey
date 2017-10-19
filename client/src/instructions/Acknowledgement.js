import React from 'react';
import RadioOptions from '../components/RadioOptionsContainer';
import Question from '../components/Question';

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
    onPress={props.scheduleNotification}
  />
);

export default Acknowledgement;
