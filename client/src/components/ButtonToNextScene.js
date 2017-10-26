import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from './Button';
import { getNextScene } from '../experiment/getMatchingSchedule';

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

// next scene must be named Finish to show finish button. Better design: pass as props
const ButtonToNextScene = ({ nextScene, disabled, previousScene, onPress, startTime }) => (
  <View style={styles.buttons}>
    {previousScene &&
      <Button
        onPress={() => Actions.replace(previousScene)}
        text="Back"
      />}
    {nextScene &&
      <Button
        onPress={() => {
          if (onPress) onPress();
          Actions.replace(getNextScene(nextScene, startTime));
        }}
        text={nextScene === 'Finish' ? 'Finish' : 'Next'}
        disabled={disabled}
      />}
  </View>
);

export default ButtonToNextScene;
