import { connect } from 'react-redux';
import ReproduceDuration from './ReproduceDuration';
import { updateTrial } from '../actions';
import api from '../api';

const mapStateToProps = state => ({
  answer: state.trialAnswers[state.trialAnswers - 1],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: (recordedDuration, answer) => {
    dispatch(updateTrial({
      round: ownProps.roundNum,
      recordedDuration,
    }));
    api.postTrial({
      ...answer,
      recordedDuration,
    });
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  actualDuration: (stateProps.answer || {}).redDuration,
  updateDuration: recordedDuration =>
    dispatchProps.updateDuration(recordedDuration, stateProps.answer),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReproduceDuration);
