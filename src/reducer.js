import { combineReducers } from 'redux';
import { ActionConst } from 'react-native-router-flux';

const route = (state = null, { type, routeName }) => {
  switch (type) {
    case ActionConst.FOCUS:
      return routeName;
    default:
      return state;
  }
};

const reducer = combineReducers({
  route,
});

export default reducer;
