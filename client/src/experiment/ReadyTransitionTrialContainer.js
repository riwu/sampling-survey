import { connect } from 'react-redux';
import ReadyTransition from './ReadyTransition';
import { addNewTrial } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  answers: state.trialAnswers,
  trialRoundNum: ownProps.roundNum,
});

export default connect(
  mapStateToProps,
  { updateDuration: addNewTrial },
)(ReadyTransition);
