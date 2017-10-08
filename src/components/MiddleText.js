import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonToNextScene from './ButtonToNextScene';

const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
});

const MiddleText = ({ text, nextScene, noNext, previousScene, noPrevious }) => (
  <View style={styles.container}>
    <Text style={styles.header}>
      {text}
    </Text>
    <ButtonToNextScene
      nextScene={noNext ? undefined : nextScene}
      previousScene={noPrevious ? undefined : previousScene}
    />
  </View>
);

export default MiddleText;
