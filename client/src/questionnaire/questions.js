import React from 'react';
import { Text } from 'react-native';
import RadioOptions from '../components/RadioOptionsContainer';
import TextInputResponse from '../components/TextInputResponse';
import UnderlinedText from '../components/UnderlinedText';
import CountryPicker from '../components/CountryPickerContainer';
import CheckboxList from '../components/CheckboxList';
import Question from '../components/Question';
import timeOptions from './timeOptions';

const OTHERS = [{
  label: 'Others (please specify):',
  hasTextInput: true,
}];

const timeResponse = (
  <RadioOptions
    formHorizontal
    radio_props={timeOptions.map(option => ({
      label: option,
    }))}
  />
);

const timeResponseWithCheckbox = (
  <CheckboxList labels={timeOptions} />
);

const scaleResponse = (
  <RadioOptions
    radio_props={['Not at all true 1', '2', '3', '4', '5',
      '6', '7', '8', 'Definitely true 9'].map(option => ({
      label: option,
    }))}
  />
);

const questions = [
  {
    question: 'MTurkID no:',
    responseComponent: <TextInputResponse />,
  },
  {
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
    question: 'What is your sexual orientation?',
    responseComponent: (
      <RadioOptions
        radio_props={['Heterosexual or straight', 'Homosexual', 'Bisexual', 'Asexual'].map(option => ({
          label: option,
        })).concat(OTHERS)}
      />
    ),
  },
  {
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
    question: (
      <Text>
        What time do you normally <UnderlinedText>wake up</UnderlinedText> on a
        {' '}<UnderlinedText>weekday</UnderlinedText>?
      </Text>
    ),
    responseComponent: timeResponse,
  },
  {
    question: (
      <Text>
        What time do you normally <UnderlinedText>sleep</UnderlinedText> on a
        {' '}<UnderlinedText>weekday</UnderlinedText>?
      </Text>
    ),
    responseComponent: timeResponse,
  },
  {
    question: (
      <Text>
        What time do you normally <UnderlinedText>wake up</UnderlinedText> on a
        {' '}<UnderlinedText>weekend</UnderlinedText>?
      </Text>
    ),
    responseComponent: timeResponse,
  },
  {
    question: (
      <Text>
        What time do you normally <UnderlinedText>sleep</UnderlinedText> on a
        {' '}<UnderlinedText>weekend</UnderlinedText>?
      </Text>
    ),
    responseComponent: timeResponse,
  },

  {
    question: (
      <Text>
        On <UnderlinedText>weekdays</UnderlinedText>, when are you most likely to meet your partner? (Select all that apply)
      </Text>
    ),
    responseComponent: timeResponseWithCheckbox,
  },
  {
    question: (
      <Text>
        On <UnderlinedText>weekends</UnderlinedText>, when are you most likely to meet your partner? (Select all that apply)
      </Text>
    ),
    responseComponent: timeResponseWithCheckbox,
  },
  {
    question: 'Age:',
    responseComponent: <TextInputResponse keyboardType="numeric" numbersOnly maxLength={2} width={25} />,
  },
  {
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
    question: 'Country of birth:',
    responseComponent: <CountryPicker />,
  },
  {
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
    question: 'What is your usual country of residence?' +
    ' (i.e. the country where you spend most of your time eating and sleeping, not continent):',
    responseComponent: <CountryPicker />,
  },
  {
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
    question: 'Since I’ve been involved with my partner,' +
    ' my emotions have been on a roller coaster.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I would feel deep despair if my partner left me.',
    responseComponent: scaleResponse,
  },
  {
    question: 'Sometimes my body trembles with excitement at the sight of my partner.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I take delight in studying the movements and angles of my partner’s body.',
    responseComponent: scaleResponse,
  },
  {
    question: 'Sometimes I feel I can’t control my thought; they are obsessively on my partner.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I feel happy when I am doing something to make my partner happy.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I would rather be with my partner than anyone else.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I’d get jealous if I thought my partner were falling in love with someone else.',
    responseComponent: scaleResponse,
  },
  {
    question: 'No one else could love my partner like I do.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I yearn to know all about my partner.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I want my partner -- physically, emotionally, mentally.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I will love my partner forever.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I melt when looking deeply into my partner’s eyes.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I have an endless appetite for affection from my partner.',
    responseComponent: scaleResponse,
  },
  {
    question: 'For me, my partner is the perfect romantic partner.',
    responseComponent: scaleResponse,
  },
  {
    question: 'My partner is the person who can make me feel the happiest.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I sense my body responding when my partner touches me.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I feel tender toward my partner.',
    responseComponent: scaleResponse,
  },
  {
    question: 'My partner always seems to be on my mind.',
    responseComponent: scaleResponse,
  },
  {
    question: 'If I were separated from my partnerfor a long time, I would feel intensely lonely.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I sometimes find it difficult to concentrate on work because thoughts of my partner occupy my mind.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I want my partner to know me – my thoughts, my fears, and my hopes.',
    responseComponent: scaleResponse,
  },
  {
    question: 'Knowing that my partner cares about me makes me feel complete.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I eagerly look for signs indicating my partner’s desire for me.',
    responseComponent: scaleResponse,
  },
  {
    question: 'If my partner were going through a difficult time, I would put away my own concerns to help him/her out.',
    responseComponent: scaleResponse,
  },
  {
    question: 'My partner can make me feel effervescent and bubbly.',
    responseComponent: scaleResponse,
  },
  {
    question: 'In the presence of my partner, I yearn to touch and be touched.',
    responseComponent: scaleResponse,
  },
  {
    question: 'An existence without my partner would be dark and dismal.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I possess a powerful attraction for my partner.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I get extremely depressed when things don’t go right in my relationship with my partner.',
    responseComponent: scaleResponse,
  },


  {
    question: 'If my partner were feeling badly, my first duty would be to cheer him/her up.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I feel that I can confide in my partner about virtually everything.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I find it easy to ignore my partner ’s faults.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I would do almost anything for my partner.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I feel very possessive toward my partner.',
    responseComponent: scaleResponse,
  },
  {
    question: 'If I could never be with my partner, I would feel miserable.',
    responseComponent: scaleResponse,
  },
  {
    question: 'If I were lonely, my first thought would be to seek out my partner.',
    responseComponent: scaleResponse,
  },
  {
    question: 'One of my primary concerns is my partner ’s welfare.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I would forgive my partner for practically anything.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I feel responsible for my partner ’s well-being.',
    responseComponent: scaleResponse,
  },
  {
    question: 'When I am with my partner, I spend a good deal of time just looking at him/her.',
    responseComponent: scaleResponse,
  },
  {
    question: 'I would greatly enjoy being confided in by my partner.',
    responseComponent: scaleResponse,
  },
  {
    question: 'It would be hard for me to get along without my partner.',
    responseComponent: scaleResponse,
  },
].map((scene, i) => {
  const header = `QUESTION ${i + 1}`;
  return [header, <Question {...scene} header={header} />];
});

export default questions;
