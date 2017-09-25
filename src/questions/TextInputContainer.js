import { connect } from 'react-redux';
import TextInput from './TextInput';
import { setAnswerText } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  value: state.answers[ownProps.question],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeText: text => dispatch(setAnswerText({
    question: ownProps.question,
    text,
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextInput);
