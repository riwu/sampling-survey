import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

import logger from 'redux-logger';

import reducer from './reducers';

const middleware = [thunk];
const store = createStore(
  reducer,
  autoRehydrate(),
  applyMiddleware(...middleware),
);
persistStore(store, { storage: AsyncStorage });

export default store;
