import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Question from '../components/Question';
import RadioOptions from '../components/RadioOptionsContainer';
import { schedule } from '../experiment/getMatchingSchedule';

const SessionTimeOut = ({ startTime }) => {
  const time = moment(schedule).format('ddd, D MMM, h:mma');
  const question = {
    header: 'SESSION TIMED OUT',
    question: startTime
      ? `The session you began at ${time} has timed out. Please indicate why you did not complete the session within 30 minutes:`
      : `You missed the session at ${time}. Please indicate why you did not start the session within 30 minutes:`,
    responseComponent: (
      <RadioOptions
        radio_props={(startTime ? [
          'I had to put down my phone.',
          'I fell asleep.',
          'I was distracted by the people I am with',
        ] : [
          "I didn't have my phone with me.",
          'I was sleeping.',
          "I was doing something that couldn't be disrupted.",
        ]).map(option => ({
          label: option,
        })).concat([{
          label: 'Some other reason (please specify):',
          hasTextInput: true,
        }])}
      />
    ),
    noPrevious: true,
  };
  return (
    <Question
      {...question}
    />
  );
};

const mapStateToProps = state => ({
  startTime: (state.notificationSchedule[schedule] || {}).startTime,
});

export default connect(mapStateToProps)(SessionTimeOut);
