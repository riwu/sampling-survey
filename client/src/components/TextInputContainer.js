import { connect } from 'react-redux';
import TextInput from './TextInput';
import { setAnswerText } from '../actions/index';

const mapStateToProps = (state, ownProps) => ({
  value: (state.answers[ownProps.header] || [])[-1],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeText: text => dispatch(setAnswerText({
    header: ownProps.header,
    text,
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextInput);
