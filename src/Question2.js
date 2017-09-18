import React from 'react';
import Question from './Question';

const questions = [
  'Work- or study-related activities',
  'Leisure activities',
  'Essential activities (eg. house chores, bath)',
  'Others (please specify)',
].map((question, index) => ({
  label: question,
  value: index,
}));

const Question2 = () => (
  <Question
    header="QUESTION 2"
    question="Just before i opened this app, I was doing:"
    options={questions}
  />
);

export default Question2;
