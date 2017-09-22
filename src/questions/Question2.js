import React from 'react';
import Question from './QuestionContainer';

const questions = [
  'Work- or study-related activities',
  'Leisure activities',
  'Essential activities (eg. house chores, bath)',
];

const Question2 = () => (
  <Question
    header="QUESTION 2"
    question="Just before i opened this app, I was doing:"
    options={questions}
    nextRoute="ReadyScreen"
  />
);

export default Question2;
