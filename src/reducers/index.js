import { combineReducers } from 'redux';
import route from './route';
import answers from './answers';

const reducer = combineReducers({
  route,
  answers,
});

export default reducer;
