import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../components/Button';

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonNext: {
    marginLeft: 100,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
});

const ButtonToNextScene = ({ nextScene, disabled, previousScene }) => (
  <View style={styles.buttons}>
    <Button
      onPress={() => Actions[previousScene]()}
      text="Back"
    />
    <View style={styles.button}>
      <Button
        onPress={() => Actions[nextScene]()}
        text="Next"
        disabled={disabled}
      />
    </View>

  </View>
);

export default ButtonToNextScene;
