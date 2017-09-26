import { connect } from 'react-redux';
import Slider from './Slider';
import { setAnswerText } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  value: state.answers[ownProps.question],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSlidingComplete: text => dispatch(setAnswerText({
    question: ownProps.question,
    text,
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Slider);
