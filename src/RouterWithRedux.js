import React from 'react';
import { Router, Reducer } from 'react-native-router-flux';
import { connect } from 'react-redux';

const RouterWithRedux = ({ dispatch, children, sceneStyle }) => (
  <Router
    sceneStyle={sceneStyle}
    createReducer={params => (state, action) => {
      dispatch(action);
      return Reducer(params)(state, action);
    }}
  >
    {children}
  </Router>
);

export default connect()(RouterWithRedux);
