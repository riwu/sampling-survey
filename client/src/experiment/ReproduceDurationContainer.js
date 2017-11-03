import { connect } from 'react-redux';
import ReproduceDuration from './ReproduceDuration';
import { addExperimentRound } from '../actions';
import { schedule } from '../experiment/getMatchingSchedule';

const mapStateToProps = state => ({
  startTime: (state.notificationSchedule[schedule] || {}).startTime,
  state,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: (answer) => {
    dispatch(addExperimentRound(
      ownProps.roundNum,
      schedule,
      answer,
    ));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReproduceDuration);
