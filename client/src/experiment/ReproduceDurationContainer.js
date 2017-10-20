import { connect } from 'react-redux';
import ReproduceDuration from './ReproduceDuration';
import { addExperimentRound } from '../actions';
import api from '../api';
import getMatchingSchedule from '../experiment/getMatchingSchedule';

const mapStateToProps = (state, ownProps) => {
  const schedule = getMatchingSchedule(state.notificationSchedule);
  return {
    schedule,
    answer: (state.experimentRounds[schedule] || {})[ownProps.roundNum],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: (answer, schedule, prevAnswer) => {
    dispatch(addExperimentRound(
      ownProps.roundNum,
      schedule,
      answer,
    ));
    api.postExperimentRound({
      ...prevAnswer,
      ...answer,
      round: ownProps.roundNum,
      schedule,
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
