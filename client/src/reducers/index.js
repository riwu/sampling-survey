import { combineReducers } from 'redux';
import route from './route';
import answers from './answers';
import disqualified from './disqualified';
import trialAttemptLeft from './trialAttemptLeft';
import notificationSchedule from './notificationSchedule';
import deviceId from './deviceId';
import experimentAnswers from './experimentAnswers';

const reducer = combineReducers({
  route,
  answers,
  disqualified,
  trialAttemptLeft,
  notificationSchedule,
  deviceId,
  experimentAnswers,
});

export default reducer;
