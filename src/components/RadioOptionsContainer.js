import { connect } from 'react-redux';
import RadioOptions from './RadioOptions';
import { setAnswerIndex, setAnswerText } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  answer: state.answers[ownProps.header] || {},
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAnswerIndex: index => dispatch(setAnswerIndex(ownProps.header, index)),
  setAnswerText: (index, text) => dispatch(setAnswerText({
    header: ownProps.header,
    index,
    text,
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RadioOptions);
