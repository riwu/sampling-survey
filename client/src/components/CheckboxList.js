import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions } from 'react-native';
import Checkbox from './CheckboxContainer';
import ButtonToNextScene from './ButtonToNextSceneContainer';
import { schedule } from '../experiment/getMatchingSchedule';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  checkbox: {
    width: width / 3.9, // make sure it can fit exactly 3
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
    <View style={props.horizontal ? styles.container : { alignSelf: 'center' }}>
      {props.labels.map((label, index) => (
        <Checkbox
          style={[props.horizontal ? styles.checkbox : {},
            !label.hasTextInput && { marginBottom: 17 }]}
          key={label.label}
          label={label}
          labelStyle={styles.label}
          index={index}
          header={props.header}
        />
      ))}
    </View>
    <ButtonToNextScene
      {...props}
    />
  </View>
);

const mapStateToProps = (state, ownProps) => {
  const answer = schedule
    ? (state.experimentAnswers[schedule] || {})[ownProps.header]
    : state.answers[ownProps.header];
  let disabled = true;
  Object.entries(answer || {}).some(([key, value]) => {
    if (key === 'time') return false;
    if (ownProps.labels[key].hasTextInput && value !== undefined &&
      (typeof value !== 'string' || value.trim() === '')) {
      disabled = true;
      return true;
    }
    if (value !== undefined) {
      disabled = false;
    }
    return false;
  });
  return ({
    disabled,
  });
};

export default connect(mapStateToProps)(CheckboxList);
