import React from 'react';
import Question from '../components/Question';
import CheckboxList from '../components/CheckboxList';

const OTHERS = [{
  label: 'Others (please specify):',
  hasTextInput: true,
}];

const questionInfo = {
  responseComponent: (
    <CheckboxList
      labels={[
        'My boyfriend / girlfriend / partner / spouse',
        'My friends / colleagues / schoolmates',
        'My family',
        'Alone',
      ].map(option => ({
        label: option,
      })).concat(OTHERS)}
    />
  ),
};

const WithWho = props => (
  <Question
    {...questionInfo}
    {...props}
  />
);

export default WithWho;
