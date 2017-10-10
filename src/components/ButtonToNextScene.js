import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from './Button';

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

// next scene must be named Finish to show finish button. Better design: pass as props
const ButtonToNextScene = ({ nextScene, disabled, previousScene }) => (
  <View style={styles.buttons}>
    {previousScene &&
      <Button
        onPress={() => Actions.pop(previousScene)}
        text="Back"
      />}
    {nextScene &&
      <Button
        onPress={() => Actions.push(nextScene)}
        text={nextScene === 'Finish' ? 'Finish' : 'Next'}
        disabled={disabled}
      />}
  </View>
);

export default ButtonToNextScene;
