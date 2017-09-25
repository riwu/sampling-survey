import React from 'react';
import { Stack, Scene } from 'react-native-router-flux';

import RouterWithRedux from './RouterWithRedux';
import ReadyScreen from './ReadyScreen';
import ReadyTransition from './ReadyTransition';
import ReproduceDuration from './ReproduceDuration';
import sceneInfos from './questions/Questions';

import Question from './questions/Question';

const sceneStyle = {
  flex: 1,
  backgroundColor: 'black',
  alignItems: 'center',
};

const App = () => (
  <RouterWithRedux sceneStyle={sceneStyle}>
    <Stack key="root" hideNavBar type="replace">

      <Scene key={sceneInfos[0].question} component={() => <Question {...sceneInfos[0]} />} />

      <Scene key="ReadyScreen" component={ReadyScreen} />
      <Scene key="ReadyTransition" component={ReadyTransition} />
      <Scene key="ReproduceDuration" component={ReproduceDuration} />
    </Stack>
  </RouterWithRedux>
);

export default App;

// sceneInfos[0].question <Question {...sceneInfos[0]} />

// {
//   Questions.map(question => (
//     <Scene key={question.key} component={question.component} />
//   ))
// }
