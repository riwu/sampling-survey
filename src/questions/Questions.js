import React from 'react';
import { Text } from 'react-native';
import RadioOptions from './RadioOptionsContainer';
import TextInputResponse from './TextInputResponse';
import UnderlinedText from '../components/UnderlinedText';

const OTHERS = [{
  label: 'Others (please specify):',
  hasTextInput: true,
}];

const timeOptions = [
  '1 am', '2 am', '3 am', '4 am', '5 am', '6 am',
  '7 am', '8 am', '9 am', '10 am', '11 am', '12 noon',
  '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm',
  '7 pm', '8 pm', '9 pm', '10 pm', '11 pm', '12 midnight',
];

const sceneInfos = [
  {
    header: 'QUESTION 1',
    question: 'MTurkID no:',
    responseComponent: (
      <TextInputResponse question="MTurkID no:" />
    ),
  },
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
    header: 'QUESTION 5',
    question: (
      <Text>
        What time do you normally
        <UnderlinedText>wake up</UnderlinedText> on a
        <UnderlinedText>weekday</UnderlinedText>?
      </Text>
    ),
    options: timeOptions,
  },
  {
    header: 'QUESTION 6',
    question: (
      <Text>
        What time do you normally
        <UnderlinedText>sleep</UnderlinedText> on a
        <UnderlinedText>weekday</UnderlinedText>?
      </Text>
    ),
    options: timeOptions,
  },
  {
    header: 'QUESTION 7',
    question: (
      <Text>
        What time do you normally
        <UnderlinedText>wake up</UnderlinedText> on a
        <UnderlinedText>weekend</UnderlinedText>?
      </Text>
    ),
    options: timeOptions,
  },
  {
    header: 'QUESTION 8',
    question: (
      <Text>
        What time do you normally
        <UnderlinedText>sleep</UnderlinedText> on a
        <UnderlinedText>weekend</UnderlinedText>?
      </Text>
    ),
    options: timeOptions,
  },

  {
    header: 'QUESTION 9',
    question: (
      <Text>
        In your waking hours on most
        <UnderlinedText>weekdays</UnderlinedText>
        when do you meet your partner when awake?
      </Text>
    ),
    options: timeOptions,
  },
  {
    header: 'QUESTION 10',
    question: (
      <Text>
        In your waking hours on most
        <UnderlinedText>weekends</UnderlinedText>
        when do you meet your partner when awake?
      </Text>
    ),
    options: timeOptions,
  },

  {
    header: 'QUESTION 11',
    question: 'Age:',
    type: 'numbers',
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
