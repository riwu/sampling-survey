import { connect } from 'react-redux';
import Question from './Question';
import { setAnswerIndex, setAnswerText } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  answer: state.answers[ownProps.question] || {},
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAnswerIndex: answer => dispatch(setAnswerIndex(ownProps.question, answer)),
  setAnswerText: answer => dispatch(setAnswerText(ownProps.question, answer)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Question);
