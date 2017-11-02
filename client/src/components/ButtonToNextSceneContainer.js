import { connect } from 'react-redux';
import ButtonToNextScene from './ButtonToNextScene';
import isEligible from '../questionnaire/isEligible';
import api from '../api';
import getMatchingSchedule, { schedule } from '../experiment/getMatchingSchedule';
import { experimentEnded } from '../actions';

const isLast = header => ['SESSION TIMED OUT QUESTION', 'Question 5'].includes(header);

const mapStateToProps = (state, ownProps) => {
  let nextScene = ownProps.nextScene;
  if (ownProps.header === 'QUESTION 22' && !isEligible(state.answers)) {
    nextScene = 'NotEligible';
  } else if (isLast(ownProps.header)) {
    const newSchedule = { ...state.notificationSchedule, [schedule]: { hasEnded: true } };
    const newRoute = getMatchingSchedule(newSchedule, undefined, true);
    if (newRoute === 'GetData' || ownProps.header === 'SESSION TIMED OUT QUESTION') {
      nextScene = 'RoutingScreen';
    }
  }
  return {
    nextScene,
    startTime: (state.notificationSchedule[schedule] || {}).startTime,
    onPress: (finishedExperiment) => {
      if (ownProps.onPress) ownProps.onPress();
      if (schedule && isLast(ownProps.header)) {
        finishedExperiment(schedule);
      }
      api.postAll(state);
    },
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  onPress: () => stateProps.onPress(dispatchProps.experimentEnded),
});

export default connect(
  mapStateToProps,
  { experimentEnded },
  mergeProps,
)(ButtonToNextScene);
