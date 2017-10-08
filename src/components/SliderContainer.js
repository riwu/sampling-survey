import { connect } from 'react-redux';
import Slider from './Slider';
import { setAnswerText } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  value: state.answers[ownProps.header],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSlidingComplete: text => dispatch(setAnswerText({
    header: ownProps.header,
    text,
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Slider);
