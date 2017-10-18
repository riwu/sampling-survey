import { connect } from 'react-redux';
import Slider from './Slider';
import { addExperimentAnswer } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const currentTime = Date.now();
  const schedule = state.notificationSchedule.find(time => currentTime >= time);
  return {
    value: ((state.experimentAnswers[schedule] || {})[ownProps.header] || {})[-1],
    schedule,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSlidingComplete: (value, schedule) => dispatch(addExperimentAnswer(
    ownProps.header,
    schedule,
    { [-1]: value },
  )),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  value: stateProps.value,
  onSlidingComplete: value => dispatchProps.onSlidingComplete(value, stateProps.schedule),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Slider);
