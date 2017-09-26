import React from 'react';
import { Text } from 'react-native';
import RadioOptions from './RadioOptionsContainer';
import TextInputResponse from './TextInputResponse';
import UnderlinedText from '../components/UnderlinedText';
import CountryPicker from './CountryPickerContainer';

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

const timeResponse = (
  <RadioOptions
    formHorizontal
    radio_props={timeOptions.map(option => ({
      label: option,
    }))}
  />
);

const sceneInfos = [
  {
    header: 'QUESTION 1',
    question: 'MTurkID no:',
    responseComponent: <TextInputResponse />,
  },
  {
    header: 'QUESTION 2',
    question: 'Gender:',
    responseComponent: (
      <RadioOptions
        radio_props={['Male', 'Female'].map(option => ({
          label: option,
        })).concat(OTHERS)}
      />
    ),
  },
  {
    header: 'QUESTION 3',
    question: 'What is your sexual orientation?',
    responseComponent: (
      <RadioOptions
        radio_props={['Heterosexual or straight', 'Gay', 'Lesbian', 'Bisexual'].map(option => ({
          label: option,
        })).concat(OTHERS)}
      />
    ),
  },
  {
    header: 'QUESTION 4',
    question: 'How often do you meet your partner in a week?',
    responseComponent: (
      <RadioOptions
        radio_props={['0-1 times', '2-3 times', '4 times or more'].map(option => ({
          label: option,
        }))}
      />
    ),
  },
  {
    header: 'QUESTION 5',
    question: (
      <Text>
        What time do you normally <UnderlinedText>wake up</UnderlinedText> on a
        {' '}<UnderlinedText>weekday</UnderlinedText>?
      </Text>
    ),
    responseComponent: timeResponse,
  },
  {
    header: 'QUESTION 6',
    question: (
      <Text>
        What time do you normally <UnderlinedText>sleep</UnderlinedText> on a
        {' '}<UnderlinedText>weekday</UnderlinedText>?
      </Text>
    ),
    responseComponent: timeResponse,
  },
  {
    header: 'QUESTION 7',
    question: (
      <Text>
        What time do you normally <UnderlinedText>wake up</UnderlinedText> on a
        {' '}<UnderlinedText>weekend</UnderlinedText>?
      </Text>
    ),
    responseComponent: timeResponse,
  },
  {
    header: 'QUESTION 8',
    question: (
      <Text>
        What time do you normally <UnderlinedText>sleep</UnderlinedText> on a
        {' '}<UnderlinedText>weekend</UnderlinedText>?
      </Text>
    ),
    responseComponent: timeResponse,
  },

  {
    header: 'QUESTION 9',
    question: (
      <Text>
        In your waking hours on most <UnderlinedText>weekdays</UnderlinedText>
        {' '} when do you meet your partner when awake?
      </Text>
    ),
    responseComponent: timeResponse,
  },
  {
    header: 'QUESTION 10',
    question: (
      <Text>
        In your waking hours on most <UnderlinedText>weekends</UnderlinedText>
        {' '} when do you meet your partner when awake?
      </Text>
    ),
    responseComponent: timeResponse,
  },
  {
    header: 'QUESTION 11',
    question: 'Age:',
    responseComponent: <TextInputResponse keyboardType="numeric" numbersOnly maxLength={2} />,
  },
  {
    header: 'QUESTION 12',
    question: 'Race:',
    responseComponent: (
      <RadioOptions
        radio_props={[
          'White',
          'Black or African American',
          'American Indian or Alaska Native',
          'Asian',
          'Native Hawaiian or Other Pacific Islander',
        ].map(option => ({
          label: option,
        })).concat(OTHERS).concat({
          label: 'Two or more races (please specify):',
          hasTextInput: true,
        })}
      />
    ),
  },
  {
    header: 'QUESTION 13',
    question: '"Hispanic or Latino" refers to a person of Cuban, Mexican,' +
    ' Puerto Rican, South or Central American, or other Spanish culture or' +
    ' origin regardless of race. Are you of Hispanic or Latino origin?',
    responseComponent: (
      <RadioOptions
        radio_props={['Hispanic or Latino', 'Not Hispanic or Latino'].map(option => ({
          label: option,
        }))}
      />
    ),
  },
  {
    header: 'QUESTION 14',
    question: 'Religion:',
    responseComponent: (
      <RadioOptions
        radio_props={[
          'Buddhism',
          'Taoism/Chinese Traditional Beliefs',
          'Islam',
          'Hinduism',
          'Sikhism',
          'Roman Catholicism',
          'Christianity (Protestant)',
          'No religion',
        ].map(option => ({
          label: option,
        })).concat(OTHERS)}
      />
    ),
  },
  {
    header: 'QUESTION 15',
    question: 'Country of birth:',
    responseComponent: <CountryPicker />,
  },
  // {
  //   header: 'QUESTION 1',
  //   question: "Right now, I'm with (select all that apply):",
  //   options: [
  //     'My boyfriend / girlfriend / partner / spouse',
  //     'My friends / colleagues / schoolmates',
  //     'My family',
  //     'Alone',
  //   ],
  // },
  //
  // {
  //   header: 'QUESTION 2',
  //   question: 'Just before i opened this app, I was doing:',
  //   options: [
  //     'Work- or study-related activities',
  //     'Leisure activities',
  //     'Essential activities (eg. house chores, bath)',
  //   ],
  // },
];

export default sceneInfos.slice(14).map((scene, i) => ({
  ...scene,
  nextScene: i < sceneInfos.length - 1 ? sceneInfos[i + 1].question : undefined,
}));
