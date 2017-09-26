import React from 'react';
import { Scene } from 'react-native-router-flux';

import RouterWithRedux from './RouterWithRedux';
import ReadyScreen from './experiment/ReadyScreen';
import ReadyTransition from './experiment/ReadyTransition';
import ReproduceDuration from './experiment/ReproduceDuration';

import experimentQuestions from './experiment/questions';
import surveyQuestions from './questions/Questions';

import Question from './questions/Question';

const sceneStyle = {
  backgroundColor: 'black',
};

const App = () => (
  <RouterWithRedux sceneStyle={sceneStyle}>
    <Scene hideNavBar>

      {
        surveyQuestions.map(scene => (
          <Scene key={scene.header} component={() => <Question {...scene} />} />
        ))
      }

      {
        experimentQuestions.map(question => (
          <Scene key={question.header} component={() => <Question {...question} />} />
        ))
      }

      <Scene key="ReadyScreen" component={ReadyScreen} />
      <Scene key="ReadyTransition" component={ReadyTransition} />
      <Scene key="ReproduceDuration" component={ReproduceDuration} />
    </Scene>
  </RouterWithRedux>
);

export default App;
