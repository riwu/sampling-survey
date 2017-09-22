import React from 'react';
import Question from './QuestionContainer';

const questions = [
  'My boyfriend / girlfriend / partner / spouse',
  'My friends / colleagues / schoolmates',
  'My family',
  'Alone',
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
