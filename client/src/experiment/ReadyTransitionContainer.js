import { connect } from 'react-redux';
import ReadyTransition from './ReadyTransition';
import { addExperimentRound } from '../actions';
import { schedule } from '../experiment/getMatchingSchedule';

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: answer => dispatch(addExperimentRound(
    ownProps.roundNum,
    schedule,
    answer,
  )),
});

const mapStateToProps = state => ({
  answers: state.experimentRounds[schedule],
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadyTransition);
