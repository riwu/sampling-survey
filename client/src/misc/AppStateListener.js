import React from 'react';
import { AppState } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MiddleText from '../components/MiddleText';

const goToRoutingScreen = (state) => {
  console.log('state changed', state);
  if (state === 'active') {
    Actions.replace('RoutingScreen');
  }
};

class AppStateListener extends React.Component {
  componentDidMount() {
    console.log('mounting trial passed');
    AppState.addEventListener('change', goToRoutingScreen);
  }
  componentWillUnmount() {
    console.log('unmounting trial passed');
    AppState.removeEventListener('change', goToRoutingScreen);
  }
  render() {
    return (
      <MiddleText
        noPrevious
        text={this.props.text}
      />
    );
  }
}

export default AppStateListener;
