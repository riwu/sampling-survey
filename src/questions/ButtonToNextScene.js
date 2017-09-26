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
});

const ButtonToNextScene = ({ nextScene, disabled, previousScene }) => (
  <View style={styles.buttons}>
    { !previousScene ? null :
    <Button
      onPress={() => Actions.pop(previousScene)}
      text="Back"
    />
    }
    {!nextScene ? null :
    <Button
      onPress={() => Actions.push(nextScene)}
      text="Next"
      disabled={disabled}
    />
    }
  </View>
);

export default ButtonToNextScene;
