import React from 'react';
import { Stack, Scene } from 'react-native-router-flux';

import RouterWithRedux from './RouterWithRedux';
import ReadyScreen from './experiment/ReadyScreen';
import ReadyTransition from './experiment/ReadyTransition';
import ReproduceDuration from './experiment/ReproduceDuration';
import sceneInfos from './questions/Questions';

import Question from './questions/Question';

const sceneStyle = {
  backgroundColor: 'black',
};

const App = () => (
  <RouterWithRedux sceneStyle={sceneStyle}>
    <Stack key="root" hideNavBar>

      {
        sceneInfos.map(scene => (
          <Scene key={scene.question} component={() => <Question {...scene} />} />
        ))
      }

      <Scene key="ReadyScreen" component={ReadyScreen} />
      <Scene key="ReadyTransition" component={ReadyTransition} />
      <Scene key="ReproduceDuration" component={ReproduceDuration} />
    </Stack>
  </RouterWithRedux>
);

export default App;
