import React from 'react';
import RadioOptions from '../questions/RadioOptionsContainer';

const OTHERS = [{
  label: 'Others (please specify):',
  hasTextInput: true,
}];

const questions = [
  {
    header: 'QUESTION 1',
    question: "Right now, I'm with (select all that apply):",
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
  },
  {
    header: 'QUESTION 2',
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
    header: 'QUESTION 3',
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
    header: 'SESSION TIMED OUT',
    question: 'I did not respond earlier because:',
    responseComponent: (
      <RadioOptions
        radio_props={[
          "I didn't have my phone with me.",
          "I didn't have internet access.",
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
];

export default questions;
