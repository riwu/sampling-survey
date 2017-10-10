import React from 'react';
import { Actions } from 'react-native-router-flux';
import InstructionWithCross from './InstructionWithCross';

class RedScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      Actions.replace(this.props.nextScene);
    }, 5000);
  }
  render() {
    return (
      <InstructionWithCross
        isRed
        text="Your screen is red, Pay attention to this time duration, but do not count how much time has passed."
      />
    );
  }
}

export default RedScreen;
