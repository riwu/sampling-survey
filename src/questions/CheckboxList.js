import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Checkbox from 'react-native-checkbox-heaven';
import ButtonToNextScene from './ButtonToNextSceneContainer';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  checkbox: {
    width: width / 3.9, // make sure it can fit exactly 3
    marginBottom: 15,
    marginLeft: 20,
  },
  label: {
    color: 'white',
    marginLeft: 8,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

const CheckboxList = props => (
  <View>
    <View style={styles.container}>
      {props.labels.map((label, index) => (
        <Checkbox
          style={styles.checkbox}
          key={label}
          label={label}
          labelStyle={styles.label}
          checkboxStyle={styles.checkbox}
          checkedColor="#008080"
          checked={props.answer[index]}
          onChange={checked => props.setAnswerText(index, checked)}
        />
      ))}
    </View>
    <ButtonToNextScene
      {...props}
    />
  </View>
);

export default CheckboxList;
