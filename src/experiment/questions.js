import React from 'react';
import RadioOptions from '../questions/RadioOptionsContainer';
import Slider from './SliderContainer';

const OTHERS = [{
  label: 'Others (please specify):',
  hasTextInput: true,
}];

const miscQuestions = [
  {
    header: 'SESSION TIMED OUT',
    question: 'I did not respond earlier because:',
    responseComponent: (
      <RadioOptions
        radio_props={[
          "I didn't have my phone with me.",
          'I was sleeping.',
          "I was doing something that couldn't be disrupted.",
        ].map(option => ({
          label: option,
        })).concat([{
          label: 'Some other reason (please specify):',
          hasTextInput: true,
        }])}
      />
    ),
  },
  {
    header: 'Question 1',
    question: 'Right now, I am with (select all that apply):',
    responseComponent: (
      <RadioOptions
        radio_props={[
          'My boyfriend / girlfriend / partner / spouse',
          'My friends / colleagues / schoolmates',
          'My family',
          'Alone',
        ].map(option => ({
          label: option,
        })).concat(OTHERS)}
      />
    ),
    nextScene: 'ReadyScreen',
  },
];

const questions = [
  {
    header: 'Question 2',
    question: 'Just before i opened this app, I was doing:',
    responseComponent: (
      <RadioOptions
        radio_props={[
          'Work- or study-related activities',
          'Leisure activities',
          'Essential activities (eg. house chores, bath)',
        ].map(option => ({
          label: option,
        })).concat(OTHERS)}
      />
    ),
  },
  {
    header: 'Question 3',
    question: 'How alert or sleepy do you feel right now?',
    responseComponent: (
      <RadioOptions
        radio_props={[
          '1: Very alert',
          '2',
          '3: Alert - normal level',
          '4',
          '5: Neither alert nor sleepy',
          '6',
          '7: Sleepy, but no effort to keep awake',
          '8',
          '9: Very sleepy, great effort to keep awake',
        ].map(option => ({
          label: option,
        }))}
      />
    ),
  },
  {
    header: 'Question 4',
    question: 'How happy or sad do you feel right now?',
    responseComponent: (
      <Slider />
    ),
  },
];

const questionsWithRoute = questions.map((question, i) => ({
  ...question,
  nextScene: i < questions.length - 1 ? questions[i + 1].header : 'Finish',
  previousScene: i > 0 ? questions[i - 1].header : undefined,
})).concat(miscQuestions);
export default questionsWithRoute;
