import { connect } from 'react-redux';
import { Platform } from 'react-native';
import ReproduceDuration from './ReproduceDuration';
import { updateTrial } from '../actions';
import api from '../api';

const mapStateToProps = (state, ownProps) => ({
  answer: state.trialAnswers[state.trialAnswers.length - 1],
  nextScene: (ownProps.roundNum === 3 && Platform.OS !== 'ios') ? 'Acknowledgement' : ownProps.nextScene,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: (answer, previousAnswer) => {
    dispatch(updateTrial({
      round: ownProps.roundNum,
      ...answer,
    }));
    api.postTrial({
      ...previousAnswer,
      ...answer,
      round: ownProps.roundNum,
    });
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  nextScene: stateProps.nextScene,
  actualDuration: (stateProps.answer || {}).redDuration,
  updateDuration: answer =>
    dispatchProps.updateDuration(answer, stateProps.answer),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReproduceDuration);
