import React from 'react';
import moment from 'moment';
import WithWho from '../experiment/WithWho';
import { schedule } from '../experiment/getMatchingSchedule';

const TimeOutQns = (props) => {
  const time = moment(schedule).format('ddd, D MMM, h:mma');
  return (
    <WithWho
      header="SESSION TIMED OUT QUESTION"
      question={`On ${time}, I was with (select all that apply):`}
      {...props}
    />
  );
};

export default TimeOutQns;
