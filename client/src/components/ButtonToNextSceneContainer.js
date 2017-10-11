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
      (answer.index === undefined && (answer[-1] || '').trim() === '') || // for TextInputResponse
      Object.values(answer).every(value => value === undefined), // for CheckboxList
    postAnswer: () => api.postAnswer({
      question: ownProps.header,
      answer,
    }),
  };
};

export default connect(
  mapStateToProps,
)(ButtonToNextScene);
