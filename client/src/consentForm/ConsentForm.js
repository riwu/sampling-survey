import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import Checkbox from '../components/CheckboxContainer';
import ButtonToNextScene from '../components/ButtonToNextSceneContainer';

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
    flex: 0.95,
    marginRight: 2,
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
    justifyContent: 'space-between',
    flex: 1,
  },
});

const statements = [
  'I confirm that I have read and understand the Participant Information Sheet for the above study.',
  'I understand that all personal information will remain confidential and that all efforts will ' +
    'be made to ensure I cannot be identified (except as might be required by law).',
  'I agree that data gathered in this study may be stored anonymously and securely, and may be ' +
    'used for future related research studies that will be subject to an Institutional Review Board’s approval.',
  'I understand that my participation is voluntary and that I am free to withdraw at any time without giving a reason.',
];

const HEADER = 'ConsentForm';

const ConsentForm = props => (
  <ScrollView style={styles.container}>
    <Text style={styles.header}>{'ONLINE PARTICIPANT\nCONSENT FORM'}</Text>
    <Text style={styles.title}>Please check to select all boxes</Text>
    {statements.map((text, index) => (
      <View style={styles.checkboxContainer} key={text}>
        <Text style={styles.text}>
          {index + 1}. {text}
        </Text>
        <Checkbox index={index} header={HEADER} />
      </View>
    ))}
    <ButtonToNextScene
      header={HEADER}
      nextScene={props.nextScene}
      previousScene={props.previousScene}
      disabled={
        Object.values(props.answer).filter(checked => checked === true).length < statements.length
      }
    />
  </ScrollView>
);

ConsentForm.defaultProps = {
  answer: {},
};

const mapStateToProps = state => ({
  answer: state.answers[HEADER],
});

export default connect(mapStateToProps)(ConsentForm);
