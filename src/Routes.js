import React from 'react';
import { Scene } from 'react-native-router-flux';
import RouterWithRedux from './RouterWithRedux';
import { connect } from 'react-redux';

import MiddleText from './components/MiddleText';

import InformationSheet from './consentForm/InformationSheet';
import ConsentForm from './consentForm/ConsentForm';
import surveyQuestions from './questionnaire/questions';

import InstructionTest from './instructions/InstructionTestContainer';
import InstructionWithCross from './instructions/InstructionWithCross';
import RedScreen from './instructions/RedScreen';
import Instruction6 from './instructions/ReproduceDuration';

import ReadyScreen from './experiment/ReadyScreen';
import ReadyTransitionTrial from './experiment/ReadyTransitionTrialContainer';
import ReproduceDurationTrial from './experiment/ReproduceDurationTrialContainer';
import Acknowledgement from './instructions/Acknowledgement';

import ReadyTransition from './experiment/ReadyTransitionContainer';
import ReproduceDuration from './experiment/ReproduceDurationContainer';
import { SessionTimeOut, Question1, questionsAfterExperiment } from './experiment/questions';
import Disqualified from './questionnaire/DisqualifiedContainer';

import RoutingScreen from './RoutingScreen';

const sceneStyle = {
  backgroundColor: 'black',
};

const questions = [
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

  ...[1, 2, 3].map((roundNum, i, arr) => [
    [`ReadyScreenTrial${roundNum}`, <ReadyScreen roundText={`${roundNum} of ${arr.length}`} />],
    [`ReadyTransitionTrial${roundNum}`, <ReadyTransitionTrial />],
    [`ReproduceDurationTrial${roundNum}`, <ReproduceDurationTrial roundNum={roundNum} />],
  ]).reduce((arr, round) => [...arr, ...round], []),
  ['Acknowledgement', <Acknowledgement />],
  ['TrialPassed', <MiddleText
    noPrevious
    text={`Well done!
    Now that you understand the task, you will be prompted,
    7 times a day at random times over the course of the next week to complete this same task.
    This will not take more than 5 minutes of your time.
    Please respond within 30 minutes of prompting.`}
  />],
];

const experiment = [
  Question1,
  ['MultiTask', <MiddleText text="DO NOT MULTITASK" />],
  ...[1, 2, 3, 4, 5].map((roundNum, i, arr) => [
    [`ReadyScreen${roundNum}`, <ReadyScreen roundText={`${roundNum} of ${arr.length}`} />],
    [`ReadyTransition${roundNum}`, <ReadyTransition />],
    [`ReproduceDuration${roundNum}`, <ReproduceDuration roundNum={roundNum} />],
  ]).reduce((arr, round) => [...arr, ...round], []),
  ...questionsAfterExperiment,
  ['Finish', <MiddleText text={'Your response has been noted.\nThank you for your time.\n\n- END OF SESSION -'} noPrevious />],
];

const mapToScene = info => info.map(([key, component], i, arr) => (
  <Scene
    key={key}
    component={() => React.cloneElement(component, {
      nextScene: (arr[i + 1] || [])[0],
      previousScene: (arr[i - 1] || [])[0],
    })}
  />
));

const App = () => (
  <RouterWithRedux sceneStyle={sceneStyle}>
    <Scene hideNavBar>
      <Scene key="RoutingScreen" component={RoutingScreen} />

      {mapToScene(questions)}
      {mapToScene(experiment)}

      <Scene
        key="FailedTrial"
        component={failedProps => (
          <MiddleText
            text="Your response was incorrect. Please try again."
            nextScene={`ReadyScreenTrial${failedProps.roundNum}`}
          />
        )}
      />

      <Scene
        key="NotReady"
        component={() => (
          <MiddleText text={`Your next session is not yet ready.

          You will be prompted, 7 times a day at random times over the course of the next week to complete this same task.
          This will not take more than 5 minutes of your time.
          Please respond within 30 minutes of prompting.`}
          />
        )}
      />

      <Scene key="NotEligible" component={Disqualified} />
    </Scene>
  </RouterWithRedux>
);

export default App;
