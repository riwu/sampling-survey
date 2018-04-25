import React from 'react';
import { Actions } from 'react-native-router-flux';
import getNextRoute from './util/getNextRoute';

class RoutingScreen extends React.Component {
  componentDidMount() {
    Actions.replace(getNextRoute());
  }

  render() {
    return null;
  }
}

export default RoutingScreen;
