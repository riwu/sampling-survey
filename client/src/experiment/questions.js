import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import RadioOptions from '../components/RadioOptionsContainer';
import Question from '../components/Question';
import arousal from '../../assets/arousal.png';
import valence from '../../assets/valence.png';

const mapToQuestion = props => [props.header, <Question {...props} />];

const getPercentageResponse = (lowest, highest) => (
  <RadioOptions
    radio_props={[
      `0 - ${lowest}`,
      '10',
      '20',
      '30',
      '40',
      '50',
      '60',
      '70',
      '80',
      '90',
      `100 - ${highest}`,
    ].map(option => ({
      label: option,
    }))}
  />
);

const ImageResponse = props => (
  <View>
    <Image
      source={props.image}
      resizeMode="contain"
      style={{ width: Dimensions.get('window').width }}
    />
    <RadioOptions
      style={{ flexDirection: 'row' }}
      buttonSize={15}
      radio_props={['', '', '', '', '', '', '', '', ''].map(option => ({
        label: option,
      }))}
      {...props}
    />
  </View>
);

const questionsAfterExperiment = [
  {
    header: 'Question 0',
    question: 'How hungry do you feel right now?',
    responseComponent: getPercentageResponse('Not hungry at all', 'Extremely hungry'),
    noPrevious: true,
  },
  {
    header: 'Question 2',
    question: 'How full do you feel right now?',
    responseComponent: getPercentageResponse('Not full at all', 'Extremely full'),
  },
  {
    header: 'Question 3',
    question: 'How sleepy/alert do you feel right now?',
    responseComponent: getPercentageResponse('Not sleepy at all', 'Extremely sleepy'),
  },
  {
    header: 'Question 4',
    question: 'How positive or negative are you feeling right now?',
    responseComponent: <ImageResponse image={valence} />,
  },
  {
    header: 'Question 5',
    question: 'How passive or active are you feeling right now?',
    responseComponent: <ImageResponse image={arousal} />,
  },
].map(props => mapToQuestion(props));

export default questionsAfterExperiment;
