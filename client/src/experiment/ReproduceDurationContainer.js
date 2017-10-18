import { connect } from 'react-redux';
import ReproduceDuration from './ReproduceDuration';
import { updateAnswer } from '../actions';
import api from '../api';

const mapStateToProps = (state) => {
  const experiments = state.answers.Experiment;
  return {
    experiment: {
      ...experiments[experiments.length - 1],
      deviceId: state.deviceId,
    },
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: (recordedDuration, experiment) => {
    dispatch(updateAnswer({
      header: 'Experiment',
      answer: {
        round: ownProps.roundNum,
        recordedDuration,
      },
    }));
    api.postExperimentRound({
      round: ownProps.roundNum,
      recordedDuration,
      ...experiment,
    });
  },
});

const mergeProps = (stateProps, dispatchProps) => ({
  updateDuration: recordedDuration =>
    dispatchProps.updateDuration(recordedDuration, stateProps.experiment),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReproduceDuration);
