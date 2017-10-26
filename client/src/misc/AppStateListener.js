import React from 'react';
import { connect } from 'react-redux';
import { AppState, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MiddleText from '../components/MiddleText';
import getResponseRate from './getResponseRate';

const goToRoutingScreen = (state) => {
  console.log('state changed', state);
  if (state === 'active') {
    Actions.replace('RoutingScreen');
  }
};

class AppStateListener extends React.Component {
  componentDidMount() {
    console.log('mounting app listener', this.props.text);
    AppState.addEventListener('change', goToRoutingScreen);
  }
  componentWillUnmount() {
    console.log('unmounting app listener', this.props.text);
    AppState.removeEventListener('change', goToRoutingScreen);
  }
  render() {
    const responseRate = this.props.responseRate;
    return (
      <MiddleText
        noPrevious
        text={
          <Text>
            {this.props.text + (responseRate === undefined ? ''
              : `\n\nYour response rate is ${this.props.responseRate}%.`)}
            <Text style={{ color: 'red' }}>
              {responseRate !== undefined && responseRate < 50 &&
               '\nA response rate of 80% is required for reimbursement!'}
            </Text>
          </Text>}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  responseRate: ownProps.showResponseRate ? getResponseRate(state.experimentAnswers) : undefined,
});

export default connect(mapStateToProps)(AppStateListener);
