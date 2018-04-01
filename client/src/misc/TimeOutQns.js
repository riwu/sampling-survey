import React from 'react';
import moment from 'moment';
import WithWho from '../experiment/WithWho';
import { schedule } from '../experiment/getMatchingSchedule';
import { LAST_TIME_OUT_QUESTION } from '../constants';

const TimeOutQns = (props) => {
  const time = moment(schedule).format('ddd, D MMM, h:mma');
  return (
    <WithWho
      header={LAST_TIME_OUT_QUESTION}
      question={`On ${time}, I was with (select all that apply):`}
      {...props}
    />
  );
};

export default TimeOutQns;
