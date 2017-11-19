import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

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
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
});

const Question = ({ header, question, responseComponent, nextScene, previousScene,
  noPrevious, onPress }) =>
  (
    <ScrollView>
      <Text style={styles.header}>{header}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.question}>{question}</Text>
      </View>
      {React.cloneElement(responseComponent, {
        header,
        nextScene,
        previousScene: noPrevious ? undefined : previousScene,
        onPress,
      })}
    </ScrollView>
  );

export default Question;
