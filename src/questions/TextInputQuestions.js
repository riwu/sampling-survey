import React from 'react';
import { Text } from 'react-native';
import Question from './QuestionContainer';
import UnderlinedText from '../components/UnderlinedText';


const questions = [
  {
    header: 'QUESTION 1',
    question: 'MTurkID no:',
  },
  {
    header: 'QUESTION 11',
    question: 'Age:',
    type: 'numbers',
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
