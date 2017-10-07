import React from 'react';
import { View, StyleSheet, Slider, Text } from 'react-native';
import ButtonToNextScene from '../questions/ButtonToNextSceneContainer';

const styles = StyleSheet.create({
  container: {
    width: 200,
    alignSelf: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
  },
});

const SliderComponent = props => (
  <View>
    <Slider
      style={styles.container}
      minimumTrackTintColor="white"
      maximumTrackTintColor="green"
      {...props}
    />
    <View style={styles.textContainer}>
      <Text style={styles.text}>Sad</Text>
      <Text style={styles.text}>Happy</Text>
    </View>
    <ButtonToNextScene
      {...props}
    />
  </View>
);

export default SliderComponent;
