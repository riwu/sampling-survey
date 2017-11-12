import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middleware = [thunk];
const config = { key: 'root', storage: AsyncStorage };

const store = createStore(
  persistReducer(config, reducer),
  composeWithDevTools(applyMiddleware(...middleware)),
);
export const persistor = persistStore(store);
// persistor.purge();

export default store;
