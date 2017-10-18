import { connect } from 'react-redux';
import ButtonToNextScene from './ButtonToNextScene';
import isEligible from '../questionnaire/isEligible';
import api from '../api';

const mapStateToProps = (state, ownProps) => {
  const answer = state.answers[ownProps.header];
  return {
    nextScene: ownProps.header === 'QUESTION 22' && !isEligible(state.answers) ? 'NotEligible' : ownProps.nextScene,
    disabled: ownProps.disabled !== undefined ? ownProps.disabled :
      answer === undefined ||
      (answer[-1] !== undefined && (answer[-1] || '').trim() === '') || // for TextInputResponse
      Object.entries(answer).every(([key, value]) => key === 'time' || value === undefined), // for CheckboxList
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
          question: ownProps.header,
          createdAt: state.answers['Question 1'].time,
        });
      }
    },
  };
};

export default connect(
  mapStateToProps,
)(ButtonToNextScene);
