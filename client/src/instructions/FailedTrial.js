import React from 'react';
import { connect } from 'react-redux';
import MiddleText from '../components/MiddleText';

const FailedTrial = ({ round }) => (
  <MiddleText
    text="Your response was incorrect. Please try again."
    nextScene={`ReadyTransitionTrial${round}`}
  />
);

const mapStateToProps = state => ({
  round: (state.trialAnswers[state.trialAnswers.length - 1] || {}).round,
});

export default connect(mapStateToProps)(FailedTrial);
