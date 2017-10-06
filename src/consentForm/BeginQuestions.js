import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonToNextScene from '../questions/ButtonToNextScene';

const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 25,
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

const InformationSheet = ({ header, question, responseComponent, nextScene, previousScene }) => (
  <View style={styles.container}>
    <Text style={styles.header}>
        To begin, let's answer some questions
    </Text>
    <ButtonToNextScene nextScene="QUESTION 1" previousScene="ConsentForm" />
  </View>
);

export default InformationSheet;
