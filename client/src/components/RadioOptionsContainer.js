import { connect } from 'react-redux';
import RadioOptions from './RadioOptions';
import { setAnswerIndex, setAnswerText, addExperimentAnswer } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const isExperiment = state.notificationSchedule.length > 0;
  return {
    answer: isExperiment
      ? state.experimentAnswers[state.experimentAnswers.length - 1][ownProps.header]
      : state.answers[ownProps.header],
    isExperiment,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAnswerIndex: (index, isExperiment) => {
    if (isExperiment) {
      dispatch(addExperimentAnswer(ownProps.header, { index }));
    } else {
      dispatch(setAnswerIndex(ownProps.header, index));
    }
  },
  setAnswerText: (index, text, isExperiment) => {
    if (isExperiment) {
      dispatch(addExperimentAnswer({
        header: ownProps.header,
        answer: { [index]: text },
      }));
    } else {
      dispatch(setAnswerText({
        header: ownProps.header,
        index,
        text,
      }));
    }
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  answer: stateProps.answer,
  setAnswerIndex: index => dispatchProps.setAnswerIndex(index, stateProps.isExperiment),
  setAnswerText: (index, text) => dispatchProps.setAnswerText(index, text, stateProps.isExperiment),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RadioOptions);
