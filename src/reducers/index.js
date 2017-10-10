import { combineReducers } from 'redux';
import route from './route';
import answers from './answers';
import disqualified from './disqualified';

const reducer = combineReducers({
  route,
  answers,
  disqualified,
});

export default reducer;
