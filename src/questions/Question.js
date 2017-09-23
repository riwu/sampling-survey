import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RadioForm from '../react-native-simple-radio-button';
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
    marginTop: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  options: {
    alignItems: 'flex-start',
  },
  input: {
    color: 'white',
    borderWidth: 0.5,
    borderBottomColor: 'white',
    marginLeft: 30,
  },
  button: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
  },
});

const OTHERS = 'Others (please specify):';

class Question extends React.Component {
  render() {
    const { header, question, options, nextRoute, answer, setAnswerIndex, setAnswerText, hasOthers } = this.props;
    const checkIfOthersSelected = index => hasOthers && index === options.length;
    const isOthersSelected = checkIfOthersSelected(answer.index);
    return (
      <View>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.question}>{question}</Text>
        <RadioForm
          style={styles.options}
          radio_props={options.concat(hasOthers ? [OTHERS] : []).map((option, index) => ({
            label: option,
            value: index,
          }))}
          activeIndex={answer.index}
          onPress={(index) => {
            setAnswerIndex(index);
            if (checkIfOthersSelected(index)) {
              this.textRef.focus();
            } else {
              this.textRef.blur();
            }
          }}
          labelColor="white"
          buttonSize={12}
          animation={false}
        />
        <TextInput
          ref={(ref) => { this.textRef = ref; }}
          style={styles.input}
          opacity={isOthersSelected ? 1 : 0}
          editable={isOthersSelected}
          onFocus={() => setAnswerIndex(options.length)}
          onChangeText={setAnswerText}
          value={answer.text}
        />
        <View style={styles.button}>
          <Button
            onPress={() => {
              Actions[nextRoute]();
            }}
            text="Next"
            disabled={!answer.index || (isOthersSelected && !(answer.text || '').trim())}
          />
        </View>
      </View>
    );
  }
}

Question.defaultProps = {
  hasOthers: true,
};

export default Question;
