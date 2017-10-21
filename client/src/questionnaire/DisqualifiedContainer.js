import React from 'react';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { disqualify } from '../actions';
import MiddleText from '../components/MiddleText';

class Disqualified extends React.Component {
  componentWillMount() {
    this.props.disqualify();
  }
  render() {
    return (
      <MiddleText text={`Sorry, you are not eligible for this study.\n\nv${Constants.manifest.version}`} noPrevious />
    );
  }
}

export default connect(null, { disqualify })(Disqualified);
