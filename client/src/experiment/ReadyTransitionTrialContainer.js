import { connect } from 'react-redux';
import ReadyScreen from './ReadyScreen';
import { addNewTrial } from '../actions/index';
import { schedule } from '../experiment/getMatchingSchedule';
import api from '../actions/api';

const mapStateToProps = (state, ownProps) => ({
  answers: state.trialAnswers,
  trialRoundNum: ownProps.roundNum,
  startTime: (state.notificationSchedule[schedule] || {}).startTime,
  postAll: () => api.postAll(state),
});

export default connect(
  mapStateToProps,
  { updateDuration: addNewTrial },
)(ReadyScreen);
