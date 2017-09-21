import { connect } from 'react-redux';
import Question from './Question';
import { setAnswer } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  answer: state.answers[ownProps.question],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAnswer: answer => dispatch(setAnswer(ownProps.question, answer)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Question);
