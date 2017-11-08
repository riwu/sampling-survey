import { connect } from 'react-redux';
import ReadyScreen from './ReadyScreen';
import { addExperimentRound } from '../actions';
import { schedule } from '../experiment/getMatchingSchedule';
import api from '../actions/api';

const mapStateToProps = state => ({
  answers: state.experimentRounds[schedule],
  startTime: (state.notificationSchedule[schedule] || {}).startTime,
  postAll: () => api.postAll(state),
});

const mapDispatchToProps = dispatch => ({
  updateDuration: answer => dispatch(addExperimentRound(
    schedule,
    answer,
  )),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadyScreen);
