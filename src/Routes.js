import React from 'react';
import { Stack, Scene } from 'react-native-router-flux';

import RouterWithRedux from './RouterWithRedux';
import ReadyScreen from './ReadyScreen';
import ReadyTransition from './ReadyTransition';
import ReproduceDuration from './ReproduceDuration';
import Question2 from './questions/Question2';

const sceneStyle = {
  flex: 1,
  backgroundColor: 'black',
  alignItems: 'center',
};

const App = () => (
  <RouterWithRedux sceneStyle={sceneStyle}>
    <Stack key="root" hideNavBar type="replace">
      <Scene key="Question2" component={Question2} />

      <Scene key="ReadyScreen" component={ReadyScreen} />
      <Scene key="ReadyTransition" component={ReadyTransition} />
      <Scene key="ReproduceDuration" component={ReproduceDuration} />
    </Stack>
  </RouterWithRedux>
);

export default App;
