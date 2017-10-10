import { combineReducers } from 'redux';
import route from './route';
import answers from './answers';
import disqualified from './disqualified';
import trialAttemptLeft from './trialAttemptLeft';
import notificationSchedule from './notificationSchedule';

const reducer = combineReducers({
  route,
  answers,
  disqualified,
  trialAttemptLeft,
  notificationSchedule,
});

export default reducer;
