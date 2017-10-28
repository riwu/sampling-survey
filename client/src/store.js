import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

import logger from 'redux-logger';

import reducer from './reducers';

const middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
  console.log('logging');
//  middleware.push(logger);
}
const store = createStore(
  reducer,
  autoRehydrate(),
  applyMiddleware(...middleware),
);
persistStore(store, { storage: AsyncStorage }).purge();

export default store;
