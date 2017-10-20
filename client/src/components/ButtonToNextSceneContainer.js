import { connect } from 'react-redux';
import ButtonToNextScene from './ButtonToNextScene';
import isEligible from '../questionnaire/isEligible';
import api from '../api';
import getMatchingSchedule from '../experiment/getMatchingSchedule';

const mapStateToProps = (state, ownProps) => {
  const schedule = getMatchingSchedule(state.notificationSchedule);
  const answer = state.notificationSchedule.length === 0
    ? state.answers[ownProps.header]
    : (state.experimentAnswers[schedule] || {})[ownProps.header];

  let nextScene = ownProps.nextScene;
  if (ownProps.header === 'QUESTION 22' && !isEligible(state.answers)) {
    nextScene = 'NotEligible';
  } else if (ownProps.header === 'Question 5' && (Date.now() - schedule <= 30 * 60000)) {
    nextScene = 'Finish';
  }
  return {
    nextScene,
    disabled: ownProps.disabled !== undefined ? ownProps.disabled :
      answer === undefined ||
      (answer[-1] !== undefined && typeof answer[-1] === 'string' && (answer[-1] || '').trim() === '') || // for TextInputResponse
      Object.entries(answer || {}).every(([key, value]) => key === 'time' || value === undefined), // for CheckboxList
    onPress: () => {
      if (ownProps.onPress) ownProps.onPress();
      if (state.notificationSchedule.length === 0) {
        api.postAnswer({
          answer,
          question: ownProps.header,
        });
      } else {
        api.postExperimentAnswer({
          answer,
          schedule,
          question: ownProps.header,
        });
      }
    },
  };
};

export default connect(
  mapStateToProps,
)(ButtonToNextScene);
