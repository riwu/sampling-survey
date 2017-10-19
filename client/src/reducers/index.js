import { combineReducers } from 'redux';
import route from './route';
import answers from './answers';
import disqualified from './disqualified';
import trialAttemptLeft from './trialAttemptLeft';
import notificationSchedule from './notificationSchedule';
import experimentAnswers from './experimentAnswers';
import experimentRounds from './experimentRounds';
import trialAnswers from './trialAnswers';

const reducer = combineReducers({
  route,
  answers,
  disqualified,
  trialAttemptLeft,
  notificationSchedule,
  experimentAnswers,
  experimentRounds,
  trialAnswers,
});

export default reducer;
