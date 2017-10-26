import { connect } from 'react-redux';
import ReproduceDuration from './ReproduceDuration';
import { addExperimentRound } from '../actions';
import api from '../api';
import { schedule } from '../experiment/getMatchingSchedule';

const mapStateToProps = (state, ownProps) => ({
  answer: (state.experimentRounds[schedule] || {})[ownProps.roundNum],
  startTime: (state.notificationSchedule[schedule] || {}).startTime,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: (answer, prevAnswer) => {
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
  startTime: stateProps.startTime,
  updateDuration: answer => dispatchProps.updateDuration(answer, stateProps.answer),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReproduceDuration);
