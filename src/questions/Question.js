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
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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

const OTHERS = 'Others (please specify)';

class Question extends React.Component {
  state = {
    isInputOpen: false,
  }
  render() {
    const { header, question, options, nextRoute, answer, setAnswer, hasOthers } = this.props;
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
          initial={answer}
          onPress={(value) => {
            setAnswer(value);
            if (hasOthers && value === options.length) {
              this.setState({ isInputOpen: true });
              this.textRef.focus();
            } else {
              this.textRef.blur();
            }
          }}
          labelColor="white"
          buttonSize={12}
        />
        <TextInput
          ref={(ref) => { this.textRef = ref; }}
          style={styles.input}
          returnKeyType="next"
          opacity={this.state.isInputOpen ? 1 : 0}
          editable={this.state.isInputOpen}
          onFocus={() => setAnswer(options.length)}
        />
        <View style={styles.button}>
          <Button
            onPress={() => Actions[nextRoute]()}
            text="Next"
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
