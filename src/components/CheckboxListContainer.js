import { connect } from 'react-redux';
import CheckboxList from './CheckboxList';
import { setAnswerText } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  answer: state.answers[ownProps.header] || {},
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAnswerText: (index, text) => dispatch(setAnswerText({
    header: ownProps.header,
    index,
    text,
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckboxList);
