import React from 'react';
import RadioOptions from './RadioOptionsContainer';

const OTHERS = [{
  label: 'Others (please specify):',
  hasTextInput: true,
}];

const sceneInfos = [
  {
    header: 'QUESTION 2',
    question: 'Gender:',
    responseComponent: (
      <RadioOptions
        question="Gender:"
        radio_props={['Male', 'Female'].map(option => ({
          label: option,
        })).concat(OTHERS).concat(OTHERS)}
      />
    ),
  },
  {
    header: 'QUESTION 3',
    question: 'What is your sexual orientation?',
    options: ['Heterosexual or straight', 'Gay', 'Lesbian', 'Bisexual'],
  },
  {
    header: 'QUESTION 4',
    question: 'How often do you meet your partner in a week?',
    options: ['0-1 times', '2-3 times', '4 times or more'],
    hasOthers: false,
  },
  {
    header: 'QUESTION 4',
    question: 'How often do you meet your partner in a week?',
    options: ['0-1 times', '2-3 times', '4 times or more'],
    hasOthers: false,
  },

  {
    header: 'QUESTION 1',
    question: "Right now, I'm with (select all that apply):",
    options: [
      'My boyfriend / girlfriend / partner / spouse',
      'My friends / colleagues / schoolmates',
      'My family',
      'Alone',
    ],
  },

  {
    header: 'QUESTION 2',
    question: 'Just before i opened this app, I was doing:',
    options: [
      'Work- or study-related activities',
      'Leisure activities',
      'Essential activities (eg. house chores, bath)',
    ],
  },
];

export default sceneInfos;
