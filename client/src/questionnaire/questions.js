import React from 'react';
import { Text } from 'react-native';
import RadioOptions from '../components/RadioOptionsContainer';
import TextInputResponse from '../components/TextInputResponse';
import UnderlinedText from '../components/UnderlinedText';
import Question from '../components/Question';
import timeOptions from './timeOptions';

const timeResponse = <RadioOptions formHorizontal radio_props={timeOptions} />;

const questions = [
  {
    question: 'What is your Subject ID?',
    responseComponent: <TextInputResponse autoCorrect={false} autoCapitalize="none" />,
  },
  {
    question: (
      <Text>
        What time do you normally <UnderlinedText>wake up</UnderlinedText> on a{' '}
        <UnderlinedText>weekday</UnderlinedText>?
      </Text>
    ),
    responseComponent: timeResponse,
  },
  {
    question: (
      <Text>
        What time do you normally <UnderlinedText>sleep</UnderlinedText> on a{' '}
        <UnderlinedText>weekday</UnderlinedText>?
      </Text>
    ),
    responseComponent: timeResponse,
  },
  {
    question: (
      <Text>
        What time do you normally <UnderlinedText>wake up</UnderlinedText> on a{' '}
        <UnderlinedText>weekend</UnderlinedText>?
      </Text>
    ),
    responseComponent: timeResponse,
  },
  {
    question: (
      <Text>
        What time do you normally <UnderlinedText>sleep</UnderlinedText> on a{' '}
        <UnderlinedText>weekend</UnderlinedText>?
      </Text>
    ),
    responseComponent: timeResponse,
  },
].map((scene, i) => {
  const header = `QUESTION ${i + 1}`;
  return [header, <Question {...scene} header={header} />];
});

export default questions;
