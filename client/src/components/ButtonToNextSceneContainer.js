import { connect } from 'react-redux';
import ButtonToNextScene from './ButtonToNextScene';
import isEligible from '../questionnaire/isEligible';
import api from '../api';

const mapStateToProps = (state, ownProps) => {
  const currentTime = Date.now();
  const schedule = state.notificationSchedule.find(time => currentTime >= time);
  const answer = state.notificationSchedule.length === 0
    ? state.answers[ownProps.header]
    : (state.experimentAnswers[schedule] || {})[ownProps.header];
  return {
    nextScene: (ownProps.header === 'QUESTION 22' && !isEligible(state.answers)) ? 'NotEligible' : ownProps.nextScene,
    disabled: ownProps.disabled !== undefined ? ownProps.disabled :
      answer === undefined ||
      (answer[-1] !== undefined && (answer[-1] || '').trim() === '') || // for TextInputResponse
      Object.entries(answer || {}).every(([key, value]) => key === 'time' || value === undefined), // for CheckboxList
    onPress: () => {
      if (ownProps.onPress) ownProps.onPress();
      if (state.notificationSchedule.length === 0) {
        if (ownProps.header === 'QUESTION 22') {
          api.postAll(state);
        }
        // api.postAnswer({
        //   answer,
        //   question: ownProps.header,
        // });
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
