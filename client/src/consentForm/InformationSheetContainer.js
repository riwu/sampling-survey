import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Constants } from 'expo';
import InformationSheet from './InformationSheet';
import { disqualify } from '../actions';
import api from '../api';

const mapDispatchToProps = dispatch => ({
  onPress: () => {
    const { deviceId, deviceName, isDevice, linkingUrl, manifest } = Constants;
    api.isDisqualified(deviceId).then((disqualified) => {
      if (true) {
        console.log('here');
        dispatch(disqualify());
        Actions.replace('NotEligible');
      }
    });

    api.postDevice({
      deviceId,
      deviceName,
      isDevice,
      linkingUrl,
      version: manifest.version,
    });
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(InformationSheet);
