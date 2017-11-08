import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import logger from 'redux-logger';

import reducer from './reducers';

const middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
  console.log('logging');
  middleware.push(logger);
}

const config = { key: 'root', storage: AsyncStorage };

const store = createStore(
  persistReducer(config, reducer),
  applyMiddleware(...middleware),
);
export const persistor = persistStore(store);
// persistor.purge();

export default store;
