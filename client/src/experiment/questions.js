import React from 'react';
import RadioOptions from '../components/RadioOptionsContainer';
import Question from '../components/Question';
import Slider from '../components/SliderContainer';

const mapToQuestion = props => [props.header, <Question {...props} />];

const questionsAfterExperiment = [
  {
    header: 'Question 1',
    question: 'How hungry do you feel right now?',
    responseComponent: <Slider minText="Not hungry at all" maxText="Extremely hungry" />,
    noPrevious: true,
  },
  {
    header: 'Question 2',
    question: 'Right now, I feel',
    responseComponent: <Slider minText="Not fearful at all" maxText="Very fearful" />,
  },
  {
    header: 'Question 3',
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
    header: 'Question 4',
    question: 'Right now, I feel',
    responseComponent: <Slider minText="Not happy at all" maxText="Very happy" />,
  },
  {
    header: 'Question 5',
    question: 'Right now, I feel',
    responseComponent: <Slider minText="Very unpleasant" maxText="Very pleasant" />,
  },
  {
    header: 'Question 6',
    question: 'Did you eat anything in the last 30 mins?',
    responseComponent: (
      <RadioOptions
        radio_props={[{ label: 'Yes (please specify):', hasTextInput: true }, { label: 'No' }]}
      />
    ),
  },
].map(props => mapToQuestion(props));

export default questionsAfterExperiment;
