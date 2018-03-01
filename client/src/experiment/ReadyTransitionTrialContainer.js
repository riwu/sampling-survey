import { connect } from 'react-redux';
import ReadyScreen from './ReadyScreen';
import { addNewTrial } from '../actions';
import { schedule } from '../experiment/getMatchingSchedule';

const mapStateToProps = (state, ownProps) => ({
  answers: state.trialAnswers,
  trialRoundNum: ownProps.roundNum,
  startTime: (state.notificationSchedule[schedule] || {}).startTime,
});

export default connect(mapStateToProps, { updateDuration: addNewTrial })(ReadyScreen);
