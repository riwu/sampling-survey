import { connect } from 'react-redux';
import ReadyScreen from './ReadyScreen';
import { addExperimentRound } from '../actions';
import { schedule } from '../experiment/getMatchingSchedule';

const mapStateToProps = state => ({
  answers: state.experimentRounds[schedule],
  startTime: (state.notificationSchedule[schedule] || {}).startTime,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: answer => dispatch(addExperimentRound(
    ownProps.roundNum,
    schedule,
    answer,
  )),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadyScreen);
