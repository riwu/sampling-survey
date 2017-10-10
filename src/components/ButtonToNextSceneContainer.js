import { connect } from 'react-redux';
import ButtonToNextScene from './ButtonToNextScene';
import { scheduleNotification } from '../actions';
import isEligible from '../questionnaire/isEligible';

const mapStateToProps = (state, ownProps) => {
  const answer = state.answers[ownProps.header];
  return {
    shouldScheduleNotification: ownProps.header === 'Acknowledgement',
    nextScene: ownProps.header === 'QUESTION 22' && !isEligible(state.answers) ? 'NotEligible' : ownProps.nextScene,
    disabled: ownProps.disabled !== undefined ? ownProps.disabled :
      ((answer === undefined) ||
      (typeof answer === 'string' && answer.trim() === '') || // for TextInputResponse
      (typeof answer === 'object' && Object.values(answer).every(value => value === undefined))), // for CheckboxList
  };
};

export default connect(
  mapStateToProps,
  { scheduleNotification },
)(ButtonToNextScene);
