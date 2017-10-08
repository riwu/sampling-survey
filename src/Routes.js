import React from 'react';
import { Scene } from 'react-native-router-flux';
import RouterWithRedux from './RouterWithRedux';

import MiddleText from './components/MiddleText';

import InformationSheet from './consentForm/InformationSheet';
import ConsentForm from './consentForm/ConsentForm';
import surveyQuestions from './questionnaire/questions';

import InstructionTest from './instructions/InstructionTest';
import InstructionWithCross from './instructions/InstructionWithCross';
import RedScreen from './instructions/RedScreen';
import Instruction6 from './instructions/ReproduceDuration';

import ReadyScreen from './experiment/ReadyScreen';
import ReadyTransitionTrial from './experiment/ReadyTransitionTrialContainer';
import ReadyTransition from './experiment/ReadyTransitionContainer';
import ReproduceDurationTrial from './experiment/ReproduceDurationTrialContainer';
import ReproduceDuration from './experiment/ReproduceDurationContainer';
import { SessionTimeOut, Question1, questionsAfterExperiment } from './experiment/questions';


const sceneStyle = {
  backgroundColor: 'black',
};

const scenes = [
  ...[1, 2, 3].map((roundNum, i, arr) => [
    [`ReadyScreenTrial${roundNum}`, <ReadyScreen roundText={`${roundNum} of ${arr.length}`} />],
    [`ReadyTransitionTrial${roundNum}`, <ReadyTransitionTrial roundNum={roundNum} />],
    [`ReproduceDurationTrial${roundNum}`, <ReproduceDurationTrial />],
  ]).reduce((arr, round) => [...arr, ...round], []),

  ['InformationSheet', <InformationSheet />],
  ['ConsentForm', <ConsentForm />],
  ['BeginQuestions', <MiddleText text="To begin, let's answer some questions" />],
  ...surveyQuestions,
  ['InstructionTest', <InstructionTest />],
  ['Instruction1', <MiddleText text="Your task is to estimate how long your screen is red." noPrevious />],
  ['Instruction2', <InstructionWithCross text={'First, you will see a black screen with a cross.\n\nPlease look at the cross.'} />],
  ['Instruction3', <InstructionWithCross text="At some point, the screen will turn red" />],
  ['Instruction4', <RedScreen />],
  ['Instruction5', <MiddleText text="Now tell us how long the screen was red." noPrevious />],
  ['Instruction6', <Instruction6 />],
  ['Instruction7', <MiddleText text="Well done! Now there will be 3 rounds of trials for you to practice." noPrevious />],

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
