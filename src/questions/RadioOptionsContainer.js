import { connect } from 'react-redux';
import RadioOptions from './RadioOptions';
import { setAnswerIndex, setAnswerText } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  answer: state.answers[ownProps.question] || {},
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAnswerIndex: index => dispatch(setAnswerIndex(ownProps.question, index)),
  setAnswerText: (index, answer) => dispatch(setAnswerText(ownProps.question, index, answer)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RadioOptions);
