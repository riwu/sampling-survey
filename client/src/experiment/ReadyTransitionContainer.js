import { connect } from 'react-redux';
import ReadyTransition from './ReadyTransition';
import { addExperimentRound } from '../actions';

const mapStateToProps = (state) => {
  const currentTime = Date.now();
  return {
    schedule: state.notificationSchedule.find(time => currentTime >= time),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: (answer, schedule) => dispatch(addExperimentRound(
    ownProps.roundNum,
    schedule,
    answer,
  )),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  updateDuration: answer => dispatchProps.updateDuration(answer, stateProps.schedule),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReadyTransition);
