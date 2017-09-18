import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: 'bold',
  },
  question: {
    color: 'white',
    fontSize: 15,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  options: {

  },
});
class Option extends React.Component {
  state = {
    value: 0,
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.header}</Text>
        <Text style={styles.question}>{this.props.question}</Text>
        <RadioForm
          radio_props={this.props.options}
          initial={0}
          onPress={(value) => { this.setState({ value }); }}
          labelColor="white"
          buttonSize={5}
        />
      </View>
    );
  }
}

export default Option;
