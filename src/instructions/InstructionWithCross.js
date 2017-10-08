import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
  plus: {
    color: 'white',
    fontSize: 50,
    marginTop: 150,
    marginBottom: 50,
  },
  isRed: {
    backgroundColor: 'red',
  },
});

const InstructionWithCross = ({ nextScene, text, isRed }) => (
  <ScrollView>
    <View style={[styles.container, isRed && styles.isRed]}>
      <Text style={styles.plus} >+</Text>
      <View style={styles.instructionContainer}>
        <View style={{ flex: 0.1 }} />
        <View style={styles.instructions}>
          <Text style={styles.instructionTitle}>{text}</Text>
        </View>
        <View style={{ flex: 0.1 }} />
      </View>
      {!isRed && <Button text="Continue" onPress={() => Actions.replace(nextScene)} />}
    </View>
  </ScrollView>
);

export default InstructionWithCross;
