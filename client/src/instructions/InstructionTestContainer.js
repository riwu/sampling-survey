import { connect } from 'react-redux';
import InstructionTest from './InstructionTest';
import { lowerTrialAttempt } from '../actions/index';

const mapStateToProps = state => ({
  attemptLeft: state.trialAttemptLeft,
});

export default connect(
  mapStateToProps,
  { lowerTrialAttempt },
)(InstructionTest);
