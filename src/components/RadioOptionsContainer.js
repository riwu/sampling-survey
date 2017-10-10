import { connect } from 'react-redux';
import RadioOptions from './RadioOptions';
import { setAnswerIndex, setAnswerText, disqualify } from '../actions';
import isEligible from '../questionnaire/isEligible';

const mapStateToProps = (state, ownProps) => ({
  answer: state.answers[ownProps.header],
  isEligible: ownProps.checkEligibility ? isEligible(state.answers) : true,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAnswerIndex: index => dispatch(setAnswerIndex(ownProps.header, index)),
  setAnswerText: (index, text) => dispatch(setAnswerText({
    header: ownProps.header,
    index,
    text,
  })),
  disqualify: () => dispatch(disqualify()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RadioOptions);
