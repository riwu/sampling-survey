import { connect } from 'react-redux';
import ReproduceDuration from './ReproduceDuration';
import { addExperimentRounds } from '../actions';
import api from '../api';

const mapStateToProps = (state, ownProps) => {
  const currentTime = Date.now();
  const schedule = state.notificationSchedule.find(time => currentTime >= time);
  return {
    schedule,
    answer: (state.experimentRounds[schedule] || {})[ownProps.roundNum],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: (recordedDuration, schedule, answer) => {
    dispatch(addExperimentRounds(
      ownProps.roundNum,
      schedule,
      { recordedDuration },
    ));
    api.postExperimentRound({
      ...answer,
      round: ownProps.roundNum,
      recordedDuration,
    });
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  updateDuration: recordedDuration =>
    dispatchProps.updateDuration(recordedDuration, stateProps.schedule, stateProps.answer),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReproduceDuration);
