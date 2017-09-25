import React from 'react';
import { Text } from 'react-native';
import Question from './QuestionContainer';
import UnderlinedText from '../components/UnderlinedText';

const timeOptions = [
  '1 am', '2 am', '3 am', '4 am', '5 am', '6 am',
  '7 am', '8 am', '9 am', '10 am', '11 am', '12 noon',
  '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm',
  '7 pm', '8 pm', '9 pm', '10 pm', '11 pm', '12 midnight',
];

const questions = [
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
];

const Question1 = () => (
  <Question
    header="QUESTION 1"
    question="Right now, I'm with (select all that apply):"
    options={questions}
    nextRoute="ReadyScreen"
  />
);

export default Question1;
