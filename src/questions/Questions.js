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

const scaleResponse = (
  <RadioOptions
    radio_props={['Not at all true 1', '2', '3', '4', '5',
      '6', '7', '8', 'Definitely true 9'].map(option => ({
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
    responseComponent: <TextInputResponse keyboardType="numeric" numbersOnly maxLength={2} width={25} />,
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
  {
    header: 'QUESTION 16',
    question: 'Current marital/relationship status:',
    responseComponent: (
      <RadioOptions
        radio_props={[{ label: 'Single' }].concat([{
          label: 'In a relationship',
          dropDown: {
            label: 'Duration',
            data: [
              '<2 weeks',
              '2 weeks',
              '1 month',
              '1-2 months',
              '2-3 months',
              '3-6 months',
              '>6 months',
            ],
          },
        }]).concat([
          'Engaged',
          'Cohabitating',
          'Married',
          'Widowed',
          'Separated',
          'Divorced',
        ].map(option => ({
          label: option,
        }))).concat(OTHERS)}
      />
    ),
  },
  {
    header: 'QUESTION 17',
    question: 'Education (highest qualification obtained):',
    responseComponent: (
      <RadioOptions
        radio_props={[
          'Less than high school',
          'High school',
          'College',
          'Bachelor',
          'Post-graduate',
        ].map(option => ({
          label: option,
        })).concat(OTHERS)}
      />
    ),
  },
  {
    header: 'QUESTION 18',
    question: 'Annual family income (USD):',
    responseComponent: (
      <RadioOptions
        radio_props={[
          'Below $30,000',
          '$30,000 - $49,999',
          '$50,000 - $74,999',
          '$75,000 - $99,999',
          '$100,000 and above',
        ].map(option => ({
          label: option,
        }))}
      />
    ),
  },
  {
    header: 'QUESTION 19',
    question: 'Household size:',
    responseComponent: (
      <RadioOptions
        radio_props={['1', '2', '3', '4', '5+'].map(option => ({
          label: option,
        }))}
      />
    ),
  },
  {
    header: 'QUESTION 20',
    question: 'What is your usual country of residence?' +
    ' (i.e. the country where you spend most of your time eating and sleeping, not continent):',
    responseComponent: <CountryPicker />,
  },
  {
    header: 'QUESTION 21',
    question: 'Which of the following best describes the setting you grew up in?',
    responseComponent: (
      <RadioOptions
        radio_props={[
          'Rural',
          'Small town',
          'Large town or small city',
          'Suburb',
          'Large city',
        ].map(option => ({
          label: option,
        })).concat(OTHERS)}
      />
    ),
  },
  {
    header: 'QUESTION 22',
    question: 'Occupation:',
    responseComponent: (
      <RadioOptions
        radio_props={[
          'Computer worker',
          'Engineer',
          'Mathematician and statistician',
          'Life Scientist',
          'Physical Scientist',
          'Social Scientist',
          'Architect',
          'Legal',
          'Education',
          'Arts and Entertainment',
          'Service',
          'Sales',
          'Office Support',
          'Agriculture',
          'Healthcare',
          'Construction and Maintenance',
          'Manager',
          'Production',
          'Business and Finance',
          'Social Service',
        ].map(option => ({
          label: option,
        })).concat(OTHERS)}
      />
    ),
  },
  {
    header: 'QUESTION 23',
    question: 'I acknowledge that a response rate of >80%' +
    ' in the subsequent tasks is required for me to receive reimbursement',
    responseComponent: (
      <RadioOptions
        radio_props={['Yes', 'No'].map(option => ({
          label: option,
        }))}
      />
    ),
  },


  {
    header: 'QUESTION 24',
    question: 'Since I’ve been involved with ____________,' +
    ' my emotions have been on a roller coaster.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 25',
    question: 'I would feel deep despair if ____________ left me.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 26',
    question: 'Sometimes my body trembles with excitement at the sight of ____________.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 27',
    question: 'I take delight in studying the movements and angles of ____________’s body.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 28',
    question: 'Sometimes I feel I can’t control my thought; they are obsessively on ____________.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 29',
    question: 'I feel happy when I am doing something to make ____________ happy.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 30',
    question: 'I would rather be with ____________ than anyone else.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 31',
    question: 'I’d get jealous if I thought ____________ were falling in love with someone else.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 32',
    question: 'No one else could love ____________ like I do.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 33',
    question: 'I yearn to know all about ____________.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 34',
    question: 'I want ____________ -- physically, emotionally, mentally.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 35',
    question: 'I will love ____________ forever.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 36',
    question: 'I melt when looking deeply into ____________’s eyes.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 37',
    question: 'I have an endless appetite for affection from ____________.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 38',
    question: 'For me, ____________ is the perfect romantic partner.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 39',
    question: '____________ is the person who can make me feel the happiest.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 40',
    question: 'I sense my body responding when ____________ touches me.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 41',
    question: 'I feel tender toward ____________.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 42',
    question: '____________ always seems to be on my mind.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 43',
    question: 'If I were separated from ____________for a long time, I would feel intensely lonely.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 44',
    question: 'I sometimes find it difficult to concentrate on work because thoughts of ____________ occupy my mind.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 45',
    question: 'I want ____________ to know me – my thoughts, my fears, and my hopes.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 46',
    question: 'Knowing that ____________ cares about me makes me feel complete.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 47',
    question: 'I eagerly look for signs indicating ____________’s desire for me.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 48',
    question: 'If ____________ were going through a difficult time, I would put away my own concerns to help him/her out.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 49',
    question: '____________ can make me feel effervescent and bubbly.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 50',
    question: 'In the presence of ____________, I yearn to touch and be touched.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 51',
    question: 'An existence without ____________ would be dark and dismal.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 52',
    question: 'I possess a powerful attraction for ____________.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 53',
    question: 'I get extremely depressed when things don’t go right in my relationship with ____________.',
    responseComponent: scaleResponse,
  },


  {
    header: 'QUESTION 54',
    question: 'If ________ were feeling badly, my first duty would be to cheer him (her) up.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 55',
    question: 'I feel that I can confide in ________ about virtually everything.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 56',
    question: 'I find it easy to ignore ________ ’s faults.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 57',
    question: 'I would do almost anything for ________.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 58',
    question: 'I feel very possessive toward ________.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 59',
    question: 'If I could never be with ________, I would feel miserable.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 60',
    question: 'If I were lonely, my first thought would be to seek out ________.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 61',
    question: 'One of my primary concerns is ________ ’s welfare.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 62',
    question: 'I would forgive ________ for practically anything.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 63',
    question: 'I feel responsible for ________ ’s well-being.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 64',
    question: 'When I am with ________, I spend a good deal of time just looking at him (her).',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 65',
    question: 'I would greatly enjoy being confided in by ________.',
    responseComponent: scaleResponse,
  },
  {
    header: 'QUESTION 66',
    question: 'It would be hard for me to get along without ________.',
    responseComponent: scaleResponse,
  },
];

const scenes = sceneInfos.map((scene, i) => ({
  ...scene,
  nextScene: i < sceneInfos.length - 1 ? sceneInfos[i + 1].header : 'Question 1',
  previousScene: i > 0 ? sceneInfos[i - 1].header : undefined,
}));

export default scenes;
