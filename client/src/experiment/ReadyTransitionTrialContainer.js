import { connect } from 'react-redux';
import ReadyScreen from './ReadyScreen';
import { addNewTrial } from '../actions';
import { schedule } from '../experiment/getMatchingSchedule';

const mapStateToProps = (state, ownProps) => ({
  answers: state.trialAnswers,
  trialRoundNum: ownProps.roundNum,
  startTime: (state.notificationSchedule[schedule] || {}).startTime,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: answer => dispatch(addNewTrial({ ...answer, round: ownProps.roundNum })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadyScreen);
