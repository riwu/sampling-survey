import React from 'react';
import { Scene, ScrollView } from 'react-native-router-flux';
import RouterWithRedux from './RouterWithRedux';

import InformationSheet from './consentForm/InformationSheet';
import ConsentForm from './consentForm/ConsentForm';
import surveyQuestions from './questionnaire/questions';

import { SessionTimeOut, Question1, questionsAfterExperiment } from './experiment/questions';
import ReadyScreen from './experiment/ReadyScreen';
import ReadyTransition from './experiment/ReadyTransition';
import ReproduceDuration from './experiment/ReproduceDuration';
import MiddleText from './components/MiddleText';

import InstructionTest from './instructions/InstructionTest';
import InstructionWithCross from './instructions/InstructionWithCross';
import RedScreen from './instructions/RedScreen';
import Instruction6 from './instructions/ReproduceDuration';

const sceneStyle = {
  backgroundColor: 'black',
};

const scenes = [
  ['InformationSheet', <InformationSheet />],

  ['ReproduceDuration', <ReproduceDuration />],

  ['Instruction6', <Instruction6 />],

  ['Instruction5', <MiddleText text="Now tell us how long the screen was red." noPrevious />],
  ['Instruction4', <RedScreen />],

  ['Instruction3', <InstructionWithCross text="At some point, the screen will turn red" />],

  ['Instruction2', <InstructionWithCross text={'First, you will see a black screen with a cross.\n\nPlease look at the cross.'} />],

  ['Instruction1', <MiddleText text="Your task is to estimate how long your screen is red." noPrevious />],
  ['InstructionTest', <InstructionTest />],

  ['ConsentForm', <ConsentForm />],
  ['BeginQuestions', <MiddleText text="To begin, let's answer some questions" />],
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
