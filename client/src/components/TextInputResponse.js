import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import TextInput from './TextInputContainer';
import ButtonToNextScene from './ButtonToNextSceneContainer';
import { schedule } from '../experiment/getMatchingSchedule';

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignSelf: 'center',
  },
});

const TextInputComponent = (props) => {
  const { nextScene, header, previousScene, ...inputProps } = props;
  return (
    <View>
      <View style={[styles.container, props.width && { width: props.width }]}>
        <TextInput header={header} {...inputProps} autoFocus />
      </View>
      <ButtonToNextScene
        nextScene={nextScene}
        previousScene={previousScene}
        header={header}
        disabled={props.disabled}
      />
    </View>
  );
};

const mapStateToProps = (state, ownProps) => {
  const answer = schedule
    ? (state.experimentAnswers[schedule] || {})[ownProps.header]
    : state.answers[ownProps.header];
  return ({
    disabled: answer === undefined || answer[-1].trim() === '',
  });
};

export default connect(mapStateToProps)(TextInputComponent);
