import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

import ReadyScreen from './ReadyScreen';
import ReadyTransition from './ReadyTransition';
import ReproduceDuration from './ReproduceDuration';
import Question2 from './Question2';

const sceneStyle = {
  flex: 1,
  backgroundColor: 'black',
  alignItems: 'center',
};

const ConnectedRouter = connect()(Router);

const App = () => (
  <ConnectedRouter sceneStyle={sceneStyle}>
    <Scene>
      <Scene key="ReadyScreen" component={ReadyScreen} />
      <Scene key="ReadyTransition" component={ReadyTransition} />
      <Scene key="ReproduceDuration" component={ReproduceDuration} />
      <Scene key="Question2" component={Question2} />
    </Scene>
  </ConnectedRouter>
);


export default App;
