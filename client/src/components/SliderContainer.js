import { connect } from 'react-redux';
import Slider from './Slider';
import { addExperimentAnswer } from '../actions/index';
import { schedule } from '../experiment/getMatchingSchedule';

const mapStateToProps = (state, ownProps) => ({
  value: ((state.experimentAnswers[schedule] || {})[ownProps.header] || {})[-1],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSlidingComplete: value => dispatch(addExperimentAnswer(
    ownProps.header,
    schedule,
    { [-1]: value },
  )),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Slider);
