import { connect } from 'react-redux';
import ButtonToNextScene from './ButtonToNextScene';
import isEligible, { isSingle } from '../questionnaire/isEligible';
import api from '../actions/api';
import getMatchingSchedule, { schedule } from '../experiment/getMatchingSchedule';
import { experimentEnded } from '../actions';

const isLast = header => ['SESSION TIMED OUT QUESTION', 'Question 5'].includes(header);

const getNextScene = (state, ownProps) => {
  switch (ownProps.header) {
    case 'QUESTION 19':
      if (!isEligible(state.answers)) {
        return 'NotEligible';
      } else if (isSingle(state)) { // single
        return 'InstructionTest';
      }
      break;
    case 'QUESTION 22':
      if (state.answers['QUESTION 20'].index < 2) {
        return 'NotEligible';
      }
      break;
    case 'SESSION TIMED OUT QUESTION':
      return 'RoutingScreen';
    case 'Question 5': {
      const newSchedule = { ...state.notificationSchedule, [schedule]: { hasEnded: true } };
      const newRoute = getMatchingSchedule(newSchedule, undefined, true);
      if (newRoute === 'GetData') {
        return newRoute;
      }
      break;
    }
    default:
      break;
  }
  return ownProps.nextScene;
};

const mapStateToProps = (state, ownProps) => ({
  nextScene: getNextScene(state, ownProps),
  startTime: (state.notificationSchedule[schedule] || {}).startTime,
  onPress: (finishedExperiment) => {
    if (ownProps.onPress) ownProps.onPress();
    if (schedule && isLast(ownProps.header)) {
      finishedExperiment(schedule);
    }
    api.postAll(state);
  },
});

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
