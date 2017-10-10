import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import Checkbox from 'react-native-checkbox-heaven';
import ButtonToNextScene from '../components/ButtonToNextScene';

const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 15,
    marginRight: 5,
    flex: 0.99,
  },
  container: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  checkboxContainer: {
    marginBottom: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});

const statements = ['I confirm that I have read and understand the Participant Information Sheet for the above study.',
  'I understand that all personal information will remain confidential and that all efforts will be made to ensure I cannot be identified (except as might be required by law).',
  'I agree that data gathered in this study may be stored anonymously and securely, and may be used for future related research studies that will be subject to an Institutional Review Board’s approval.',
  'I understand that my participation is voluntary and that I am free to withdraw at any time without giving a reason by closing the browser.',
  'I agree that I am at least 21 years of age.',
  'I agree to take part in this study.',
];

class ConsentForm extends React.Component {
  state = {
    checkCount: 0,
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>
          {'ONLINE PARTICIPANT\nCONSENT FORM'}
        </Text>
        <Text style={styles.title}>
          Please check to select all boxes
        </Text>
        {statements.map((text, index) => (
          <View style={styles.checkboxContainer} key={text}>
            <Text style={styles.text}>
              {index + 1}. {text}
            </Text>
            <Checkbox
              checkedColor="#008080"
              onChange={checked => this.setState({
                checkCount: this.state.checkCount + (checked ? 1 : -1),
              })}
            />
          </View>
        ))}
        <ButtonToNextScene
          nextScene={this.props.nextScene}
          previousScene={this.props.previousScene}
          disabled={this.state.checkCount < statements.length}
        />
      </ScrollView>
    );
  }
}

export default ConsentForm;
