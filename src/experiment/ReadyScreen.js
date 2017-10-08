import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    color: 'white',
    marginTop: 50,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  subHeader: {
    color: 'white',
  },
  instructionContainer: {
    flexDirection: 'row',
  },
  instructions: {
    backgroundColor: 'lightgrey',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: 'lightgrey',
    flex: 0.8,
  },
  instructionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  plus: {
    color: 'white',
    fontSize: 50,
    marginTop: 60,
  },
});

const ReadyScreen = ({ nextScene }) => (
  <ScrollView>
    <View style={styles.container}>
      <Text style={styles.header}>READY FOR YOUR TASK?</Text>
      <Text style={styles.subHeader}>ROUND 1 OF 5</Text>
      <Text style={styles.plus} >+</Text>
      <View style={styles.instructionContainer}>
        <View style={{ flex: 0.1 }} />
        <View style={styles.instructions}>
          <Text style={styles.instructionTitle}>Tell us how long the screen turns red for</Text>
          <Text style={styles.text}>1. Click 'ready' and the screen will turn red.</Text>
          <Text style={styles.text}>2. When the screen is red:</Text>
          <Text style={styles.text}>- Focus on the cross above(+)</Text>
          <Text style={styles.text}>- <Text style={{ textDecorationLine: 'underline' }}>Don't count</Text> how much time has passed</Text>
          <Text style={styles.text}>- We're interested in what it
            <Text style={{ fontStyle: 'italic' }}> feels like</Text> to you
          </Text>
        </View>
        <View style={{ flex: 0.1 }} />
      </View>
      <Button text="Ready" onPress={() => Actions.replace(nextScene)} />
    </View>
  </ScrollView>
);

export default ReadyScreen;
