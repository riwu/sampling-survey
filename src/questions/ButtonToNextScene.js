import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../components/Button';

const styles = StyleSheet.create({
  button: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
  },
});

const ButtonToNextScene = ({ nextScene, disabled }) => (
  <View style={styles.button}>
    <Button
      onPress={() => {
        Actions[nextScene]();
      }}
      text="Next"
      disabled={disabled}
    />
  </View>
);

export default ButtonToNextScene;
