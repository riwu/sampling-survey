import { connect } from 'react-redux';
import RadioOptions from './RadioOptions';
import { setAnswerIndex, setAnswerText, addExperimentAnswer } from '../actions';
import getMatchingSchedule from '../experiment/getMatchingSchedule';

const mapStateToProps = (state, ownProps) => {
  const schedule = getMatchingSchedule(state.notificationSchedule);
  return {
    answer: schedule
      ? (state.experimentAnswers[schedule] || {})[ownProps.header]
      : state.answers[ownProps.header],
    schedule,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAnswerIndex: (index, schedule) => {
    if (schedule) {
      dispatch(addExperimentAnswer(ownProps.header, schedule, { index }));
    } else {
      dispatch(setAnswerIndex(ownProps.header, index));
    }
  },
  setAnswerText: (index, text, schedule) => {
    if (schedule) {
      dispatch(addExperimentAnswer(ownProps.header, schedule, { [index]: text }));
    } else {
      dispatch(setAnswerText({ header: ownProps.header, index, text }));
    }
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  answer: stateProps.answer,
  setAnswerIndex: index => dispatchProps.setAnswerIndex(index, stateProps.schedule),
  setAnswerText: (index, text) => dispatchProps.setAnswerText(index, text, stateProps.schedule),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RadioOptions);
