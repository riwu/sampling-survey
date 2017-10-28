import React from 'react';
import { connect } from 'react-redux';
import MiddleText from '../components/MiddleText';
import getResponseRate from './getResponseRate';

const RewardScreen = ({ meetCriteria }) => (
  <MiddleText
    text={meetCriteria
      ? 'Thank you for completing our experimental study.\n\n' +
        'Please input the following code into MTurk for your reimbursement.\n\nCode: YNCSL'
      : 'You did not meet the requirement of 80% response rate for our task.\n\n' +
        'We regret to inform you that you will not be reimbursed for your participation.'}
  />
);

const mapStateToProps = state => ({
  meetCriteria: getResponseRate(state.experimentAnswers) >= 60,
});

export default connect(mapStateToProps)(RewardScreen);
