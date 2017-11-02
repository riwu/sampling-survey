import { connect } from 'react-redux';
import ReproduceDuration from './ReproduceDuration';
import { addExperimentRound } from '../actions';
import api from '../api';
import { schedule } from '../experiment/getMatchingSchedule';

const mapStateToProps = state => ({
  startTime: (state.notificationSchedule[schedule] || {}).startTime,
  state,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: (answer, state) => {
    dispatch(addExperimentRound(
      ownProps.roundNum,
      schedule,
      answer,
    ));
    api.postAll(state);
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  startTime: stateProps.startTime,
  updateDuration: answer => dispatchProps.updateDuration(answer, stateProps.state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReproduceDuration);
