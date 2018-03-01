import React from 'react';
import { Scene } from 'react-native-router-flux';
import RouterWithRedux from './RouterWithRedux';

import MiddleText from './components/MiddleText';

import InformationSheet from './consentForm/InformationSheetContainer';
import ConsentForm from './consentForm/ConsentForm';
import surveyQuestions from './questionnaire/questions';

import InstructionTest from './instructions/InstructionTestContainer';
import InstructionWithCross from './instructions/InstructionWithCross';
import RedScreen from './instructions/RedScreen';
import Instruction6 from './instructions/ReproduceDuration';
import EnableNotification from './instructions/EnableNotification';
import FailedTrial from './instructions/FailedTrial';
import Acknowledgement from './instructions/AcknowledgementContainer';

import ReadyTransitionTrial from './experiment/ReadyTransitionTrialContainer';
import ReproduceDurationTrial from './experiment/ReproduceDurationTrialContainer';

import ReadyTransition from './experiment/ReadyTransitionContainer';
import ReproduceDuration from './experiment/ReproduceDurationContainer';
import questionsAfterExperiment from './experiment/questions';
import Question1 from './experiment/Question1';

import TimeOutQns from './misc/TimeOutQns';
import AppStateListener from './misc/AppStateListener';
import SessionTimeOut from './misc/SessionTimeOut';
import GetData from './misc/GetData';
import RewardScreen from './misc/RewardScreen';

import Disqualified from './questionnaire/DisqualifiedContainer';
import RoutingScreen from './RoutingScreen';

const sceneStyle = {
  backgroundColor: 'black',
};

const questions = [
  ['InformationSheet', <InformationSheet />],
  ['ConsentForm', <ConsentForm />],
  [
    'ReimbursementWarning',
    <MiddleText
      text={
        'Please note that reimbursement will only be done within NUS.' +
        '\n\nDetails of time and date will be provided upon completion of experiment.'
      }
    />,
  ],
  ['BeginQuestions', <MiddleText text="To begin, let's answer some questions" />],
  ...surveyQuestions.slice(0, 19),
  ['InstructionTest', <InstructionTest />],
  [
    'Instruction1',
    <MiddleText text="Your task is to estimate how long your screen is red." noPrevious />,
  ],
  [
    'Instruction2',
    <InstructionWithCross
      text={'First, you will see a black screen with a cross.\n\nPlease look at the cross.'}
    />,
  ],
  ['Instruction3', <InstructionWithCross text="At some point, the screen will turn red" />],
  ['Instruction4', <RedScreen />],
  ['Instruction5', <MiddleText text="Now tell us how long the screen was red." noPrevious />],
  ['Instruction6', <Instruction6 />],
  [
    'Instruction7',
    <MiddleText
      text="Well done! Now there will be 3 rounds of trials for you to practice."
      noPrevious
    />,
  ],

  ...[1, 2, 3]
    .map((roundNum, i, arr) => [
      [
        `ReadyTransitionTrial${roundNum}`,
        <ReadyTransitionTrial roundNum={roundNum} roundText={`${roundNum} of ${arr.length}`} />,
      ],
      [`ReproduceDurationTrial${roundNum}`, <ReproduceDurationTrial roundNum={roundNum} />],
    ])
    .reduce((arr, round) => [...arr, ...round], []),
  ['EnableNotification', <EnableNotification />],
  ['Acknowledgement', <Acknowledgement />],
  [
    'TrialPassed',
    <AppStateListener
      text={
        'Well done!\n' +
        'Now that you understand the task, you will be prompted, 7 times a day at random times over the course of the next week to complete this same task.\n' +
        'This will not take more than 5 minutes of your time.\n' +
        'Please respond within 30 minutes of prompting.\n\n' +
        'You may close the app now.'
      }
    />,
  ],
];

const experiment = [
  ['Question 1', <Question1 />],
  ['MultiTask', <MiddleText text="DO NOT MULTITASK" />],
  ...[1, 2, 3, 4, 5]
    .map((roundNum, i, arr) => [
      [
        `ReadyTransition${roundNum}`,
        <ReadyTransition roundNum={roundNum} roundText={`${roundNum} of ${arr.length}`} />,
      ],
      [`ReproduceDuration${roundNum}`, <ReproduceDuration roundNum={roundNum} />],
    ])
    .reduce((arr, round) => [...arr, ...round], []),
  ...questionsAfterExperiment, // differentiated from survey questions by PascalCase 'Question'
  [
    'Finish',
    <AppStateListener
      showResponseRate
      text={'Your response has been noted.\nThank you for your time.\n\n- END OF SESSION -'}
    />,
  ],
];

const timeOut = [
  ['SESSION TIMED OUT', <SessionTimeOut />],
  ['SESSION TIMED OUT QUESTION', <TimeOutQns />],
];

const completed = [['GetData', <GetData />], ['RewardScreen', <RewardScreen />]];

const mapToScene = info =>
  info.map(([key, component], i, arr) => (
    <Scene
      key={key}
      component={() =>
        React.cloneElement(component, {
          nextScene: (arr[i + 1] || [])[0],
          previousScene: (arr[i - 1] || [])[0],
        })
      }
    />
  ));

const App = () => (
  <RouterWithRedux sceneStyle={sceneStyle}>
    <Scene hideNavBar>
      <Scene key="RoutingScreen" component={RoutingScreen} />

      {mapToScene(questions)}
      {mapToScene(experiment)}
      {mapToScene(timeOut)}
      {mapToScene(completed)}

      <Scene key="FailedTrial" component={FailedTrial} />

      <Scene
        key="NotReady"
        component={() => (
          <AppStateListener
            showResponseRate
            text={
              'Your next session is not yet ready.\n\n' +
              'You will be prompted, 7 times a day at random times over the course of the next week to complete this same task.\n' +
              'This will not take more than 5 minutes of your time.\n' +
              'Please respond within 30 minutes of prompting.\n\n' +
              'You may close the app now.'
            }
          />
        )}
      />

      <Scene key="NotEligible" component={Disqualified} />
    </Scene>
  </RouterWithRedux>
);

export default App;
