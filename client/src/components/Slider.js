import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Slider from 'react-native-slider';
import ButtonToNextScene from './ButtonToNextSceneContainer';

const styles = StyleSheet.create({
  slider: {
    marginTop: 30,
    width: 200,
    alignSelf: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
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

const SliderComponent = props => (
  <View>
    <Slider
      style={styles.slider}
      minimumTrackTintColor="cyan"
      maximumTrackTintColor="white"
      thumbTintColor="cyan"
      thumbStyle={styles.thumb}
      {...props}
    />
    <View style={styles.textContainer}>
      <Text style={styles.text}>Sad</Text>
      <Text style={styles.text}>Happy</Text>
    </View>
    <ButtonToNextScene {...props} disabled={props.value === undefined} />
  </View>
);

export default SliderComponent;
