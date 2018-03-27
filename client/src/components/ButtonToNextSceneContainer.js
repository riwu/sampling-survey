import { connect } from 'react-redux';
import ButtonToNextScene from './ButtonToNextScene';
import getMatchingSchedule, { schedule } from '../experiment/getMatchingSchedule';
import { experimentEnded, postAll } from '../actions';

const isLast = header => ['SESSION TIMED OUT QUESTION', 'Question 5'].includes(header);

const getNextScene = (state, ownProps) => {
  switch (ownProps.header) {
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
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPress: () => {
    if (ownProps.onPress) ownProps.onPress();
    if (schedule && isLast(ownProps.header)) {
      dispatch(experimentEnded(schedule));
    }
    if (
      ownProps.header.startsWith('QUESTION') ||
      ['Question 5', 'SESSION TIMED OUT QUESTION'].includes(ownProps.header)
    ) {
      dispatch(postAll());
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonToNextScene);
