import { connect } from 'react-redux';
import ReadyTransition from './ReadyTransition';
import { addExperimentRound } from '../actions';
import getMatchingSchedule from '../experiment/getMatchingSchedule';

const mapStateToProps = state => ({
  schedule: getMatchingSchedule(state.notificationSchedule),
});

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
