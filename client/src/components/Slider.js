import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SliderComponent from 'react-native-slider';
import ButtonToNextScene from './ButtonToNextSceneContainer';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 40,
  },
  sliderContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  slider: {
    // marginTop: 30,
    marginBottom: 5,
    width: '100%',
    alignSelf: 'center',
  },
  textContainer: {
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  },
  thumb: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
});

const Slider = props => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.text}>{props.minText}</Text>
      <Text style={styles.text}>{props.maxText}</Text>
    </View>
    <View style={styles.sliderContainer}>
      <SliderComponent
        style={styles.slider}
        minimumTrackTintColor="cyan"
        maximumTrackTintColor="white"
        thumbTintColor="cyan"
        thumbStyle={styles.thumb}
        minimumValue={0}
        maximumValue={10}
        {...props}
      />
    </View>
    <View style={styles.textContainer}>
      {[...Array(11)].map((_, i) => (
        <Text key={i} style={styles.text}>
          {i}
        </Text>
      ))}
    </View>
    <ButtonToNextScene {...props} disabled={props.value === undefined} />
  </View>
);

export default Slider;
