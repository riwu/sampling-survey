import { combineReducers } from 'redux';
import route from './route';
import answers from './answers';
import disqualified from './disqualified';
import trialAttemptLeft from './trialAttemptLeft';

const reducer = combineReducers({
  route,
  answers,
  disqualified,
  trialAttemptLeft,
});

export default reducer;
