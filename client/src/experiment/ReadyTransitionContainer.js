import { connect } from 'react-redux';
import ReadyTransition from './ReadyTransition';
import { addExperimentRounds } from '../actions';

const mapStateToProps = (state) => {
  const currentTime = Date.now();
  return {
    schedule: state.notificationSchedule.find(time => currentTime >= time),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: (answer, schedule) => dispatch(addExperimentRounds(
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
