import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  question: {
    color: 'white',
    fontSize: 15,
    marginTop: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Question = ({ header, question, responseComponent, nextScene }) => (
  <View>
    <Text style={styles.header}>{header}</Text>
    <Text style={styles.question}>{question}</Text>
    {React.cloneElement(responseComponent, {
      question,
      nextScene,
    })}
  </View>
);

Question.defaultProps = {
  hasOthers: true,
};

export default Question;
