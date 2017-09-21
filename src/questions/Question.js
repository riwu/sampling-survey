import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Button from '../Button';

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
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  options: {
    alignItems: 'flex-start',
  },
  button: {
    alignSelf: 'flex-end',
  },
});
const Option = ({ header, question, options, nextRoute,
  answer, setAnswer }) => (
    <View>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.question}>{question}</Text>
      <RadioForm
        style={styles.options}
        radio_props={options}
        initial={answer}
        onPress={setAnswer}
        labelColor="white"
        buttonSize={5}
      />
      <View style={styles.button}>
        <Button
          onPress={() => Actions[nextRoute]()}
          text="Next"
        />
      </View>
    </View>
);

export default Option;
