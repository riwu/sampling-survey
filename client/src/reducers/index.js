import { combineReducers } from 'redux';
import route from './route';
import answers from './answers';
import disqualified from './disqualified';
import trialAttemptLeft from './trialAttemptLeft';
import notificationSchedule from './notificationSchedule';
import experimentAnswers from './experimentAnswers';
import experimentRounds from './experimentRounds';
import trialAnswers from './trialAnswers';
import code from './code';

const reducer = combineReducers({
  route,
  answers,
  disqualified,
  trialAttemptLeft,
  notificationSchedule,
  experimentAnswers,
  experimentRounds,
  trialAnswers,
  code,
});

export default reducer;
