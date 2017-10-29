import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from './Button';
import { getNextScene } from '../experiment/getMatchingSchedule';
import api from '../api';

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

// Hardcoded 'Finish'. Better design: pass as props
const ButtonToNextScene = ({ nextScene, disabled, previousScene, onPress, startTime }) => (
  <View style={styles.buttons}>
    {previousScene &&
      <Button
        onPress={() => Actions.replace(previousScene)}
        text="Back"
      />}
    {nextScene &&
      <Button
        onPress={() => Promise.resolve(onPress && onPress()).then((result) => {
          api.postInfo({
            result,
            nextScene,
            newScene: getNextScene(nextScene, startTime),
          });
          if (!result) {
            Actions.replace(getNextScene(nextScene, startTime));
          }
        })}
        text={['Finish', 'TrialPassed'].includes(nextScene) ? 'Finish' : 'Next'}
        disabled={disabled}
      />}
  </View>
);

export default ButtonToNextScene;
