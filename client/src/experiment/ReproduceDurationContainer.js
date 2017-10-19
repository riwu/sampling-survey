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
  updateDuration: (answer, schedule, prevAnswer) => {
    dispatch(addExperimentRounds(
      ownProps.roundNum,
      schedule,
      answer,
    ));
    api.postExperimentRound({
      ...prevAnswer,
      round: ownProps.roundNum,
      ...answer,
    });
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  updateDuration: answer =>
    dispatchProps.updateDuration(answer, stateProps.schedule, stateProps.answer),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReproduceDuration);
