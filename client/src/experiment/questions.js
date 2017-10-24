import React from 'react';
import RadioOptions from '../components/RadioOptionsContainer';
import Slider from '../components/SliderContainer';
import Question from '../components/Question';

const mapToQuestion = props => [props.header, <Question {...props} />];

const OTHERS = [{
  label: 'Others (please specify):',
  hasTextInput: true,
}];

const questionsAfterExperiment = [
  {
    header: 'Question 2',
    question: 'Did you multitask while doing our task?',
    responseComponent: (
      <RadioOptions
        radio_props={[
          { label: 'Yes (please elaborate):', hasTextInput: true },
          { label: 'No' },
        ]}
      />
    ),
    noPrevious: true,
  },
  {
    header: 'Question 3',
    question: 'Just before I opened this app, I was doing:',
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
    header: 'Question 4',
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
    header: 'Question 5',
    question: 'How happy or sad do you feel right now?',
    responseComponent: (
      <Slider />
    ),
  },
].map(props => mapToQuestion(props));

export default questionsAfterExperiment;
