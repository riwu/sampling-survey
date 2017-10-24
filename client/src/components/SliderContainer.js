import { connect } from 'react-redux';
import Slider from './Slider';
import { addExperimentAnswer } from '../actions';
import getMatchingSchedule from '../experiment/getMatchingSchedule';

const mapStateToProps = (state, ownProps) => {
  const { schedule } = getMatchingSchedule(state.notificationSchedule);
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
