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
    marginBottom: 30,
  },
});

// Hardcoded 'Finish'. Better design: pass as props
const ButtonToNextScene = ({
  nextScene, disabled, previousScene, onPress, startTime,
}) => (
  <View style={styles.buttons}>
    {previousScene && <Button onPress={() => Actions.replace(previousScene)} text="Back" />}
    {nextScene && (
      <Button
        onPress={() =>
          Promise.resolve(onPress && onPress()).then((result) => {
            console.log('press result', result, nextScene);
            if (!result) {
              Actions.replace(getNextScene(nextScene, startTime, undefined, previousScene));
            }
          })
        }
        text={['Finish', 'TrialPassed'].includes(nextScene) ? 'Finish' : 'Next'}
        disabled={disabled}
      />
    )}
  </View>
);

export default ButtonToNextScene;
