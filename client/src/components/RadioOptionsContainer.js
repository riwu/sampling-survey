import { connect } from 'react-redux';
import RadioOptions from './RadioOptions';
import { setAnswerIndex, setAnswerText, addExperimentAnswer } from '../actions';
import { schedule } from '../experiment/getMatchingSchedule';

const mapStateToProps = (state, ownProps) => ({
  answer: schedule
    ? (state.experimentAnswers[schedule] || {})[ownProps.header]
    : state.answers[ownProps.header],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAnswerIndex: (index) => {
    if (schedule) {
      dispatch(addExperimentAnswer(ownProps.header, schedule, { index }));
    } else {
      dispatch(setAnswerIndex(ownProps.header, index));
    }
  },
  setAnswerText: (index, text) => {
    if (schedule) {
      dispatch(addExperimentAnswer(ownProps.header, schedule, { [index]: text }));
    } else {
      dispatch(setAnswerText({ header: ownProps.header, index, text }));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RadioOptions);
