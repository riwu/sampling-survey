import React from 'react';
import moment from 'moment';
import Question from '../components/Question';
import RadioOptions from '../components/RadioOptionsContainer';
import { schedule } from '../experiment/getMatchingSchedule';

const question = {
  header: 'SESSION TIMED OUT',
  responseComponent: (
    <RadioOptions
      radio_props={[
        'I did not check my phone',
        "I didn't have my phone with me.",
        'I was sleeping.',
        "I was doing something that couldn't be disrupted.",
      ].map(option => ({
        label: option,
      })).concat([{
        label: 'Some other reason (please specify):',
        hasTextInput: true,
      }])}
    />
  ),
  noPrevious: true,
};

const SessionTimeOut = ({ nextScene }) => {
  const time = moment(schedule).format('ddd, D MMM, h:mma');
  return (
    <Question
      {...question}
      question={`You did not complete the session at ${time}. Please indicate why:`}
      nextScene={nextScene}
    />
  );
};

export default SessionTimeOut;
