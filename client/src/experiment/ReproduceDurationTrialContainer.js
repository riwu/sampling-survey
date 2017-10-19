import { connect } from 'react-redux';
import ReproduceDuration from './ReproduceDuration';
import { updateTrial } from '../actions';
import api from '../api';

const mapStateToProps = state => ({
  answer: state.trialAnswers[state.trialAnswers.length - 1],
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
  actualDuration: (stateProps.answer || {}).redDuration,
  updateDuration: answer =>
    dispatchProps.updateDuration(answer, stateProps.answer),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReproduceDuration);
