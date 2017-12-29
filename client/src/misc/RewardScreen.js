import React from 'react';
import { connect } from 'react-redux';
import MiddleText from '../components/MiddleText';
import getResponseRate from './getResponseRate';

const RewardScreen = ({ meetCriteria, code }) => (
  <MiddleText
    text={
      meetCriteria
        ? `${'Thank you for completing our experimental study.\n\nCode: '}${code}\n\n` +
          'Send the above code and your full name to phsnkmy@nus.edu.sg for reimbursement.'
        : 'You did not meet the requirement of 80% response rate for our task.\n\n' +
          'We regret to inform you that you will not be reimbursed for your participation.'
    }
  />
);

const mapStateToProps = state => ({
  meetCriteria: getResponseRate(state.experimentAnswers) >= 60,
  code: state.code,
});

export default connect(mapStateToProps)(RewardScreen);
