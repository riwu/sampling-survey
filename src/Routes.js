import React from 'react';
import { Scene } from 'react-native-router-flux';
import RouterWithRedux from './RouterWithRedux';

import InformationSheet from './consentForm/InformationSheet';
import ConsentForm from './consentForm/ConsentForm';
import MiddleTextWithNav from './components/MiddleTextWithNav';
import surveyQuestions from './questionnaire/questions';

import { SessionTimeOut, Question1, questionsAfterExperiment } from './experiment/questions';
import ReadyScreen from './experiment/ReadyScreen';
import ReadyTransition from './experiment/ReadyTransition';
import ReproduceDuration from './experiment/ReproduceDuration';
import MiddleText from './components/MiddleText';

import InstructionTest from './instructions/InstructionTest';

const sceneStyle = {
  backgroundColor: 'black',
};

const scenes = [
  ['Instruction1', <MiddleTextWithNav text="Your task is to estimate how long your screen is red." noPrevious />],
  ['InstructionTest', <InstructionTest />],

  ['InformationSheet', <InformationSheet />],
  ['ConsentForm', <ConsentForm />],
  ['BeginQuestions', <MiddleTextWithNav text="To begin, let's answer some questions" />],
  ...surveyQuestions,

  Question1,
  ['ReadyScreen', <ReadyScreen />],
  ['ReadyTransition', <ReadyTransition />],
  ['ReproduceDuration', <ReproduceDuration />],
  ...questionsAfterExperiment,
  ['Finish', <MiddleText text={'Your response has been noted.\nThank you for your time.'} />],
];

const App = () => (
  <RouterWithRedux sceneStyle={sceneStyle}>
    <Scene hideNavBar>
      {scenes.map(([key, component], i, arr) => (
        <Scene
          key={key}
          component={() => React.cloneElement(component, {
            nextScene: (arr[i + 1] || [])[0],
            previousScene: (arr[i - 1] || [])[0],
          })}
        />
      ))}
    </Scene>
  </RouterWithRedux>
);

export default App;
