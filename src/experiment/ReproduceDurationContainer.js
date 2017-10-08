import { connect } from 'react-redux';
import ReproduceDuration from './ReproduceDuration';
import { setAnswerText } from '../actions';

const getHeader = trial => `Actual Duration${trial ? ' Trial' : ''}`;

const mapStateToProps = (state, ownProps) => {
  const answers = state.answers[getHeader(ownProps.trial)];
  const answersWithDefault = answers || [];
  return {
    answers,
    actualDuration: (answersWithDefault[answersWithDefault.length - 1] || {}).redDuration,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAnswerText: (answers, recordedDuration) => dispatch(setAnswerText({
    header: getHeader(ownProps.trial),
    text: [
      ...answers.slice(0, -1),
      {
        ...answers[answers.length - 1],
        recordedDuration,
      },
    ],
  })),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  actualDuration: stateProps.actualDuration,
  setAnswerText: recordedDuration =>
    dispatchProps.setAnswerText(stateProps.answers || [], recordedDuration),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReproduceDuration);
