import Frisbee from 'frisbee';
import { Constants } from 'expo';
import DeviceInfo from 'react-native-device-info';

const deviceId = DeviceInfo ? DeviceInfo.getUniqueID() : Constants.deviceId;

const API_BASE_URL = 'http://13.228.235.195:3002/';
// const API_BASE_URL = 'http://localhost:3002/';

const api = new Frisbee({
  baseURI: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const get = path => api.get(path).then(response => response.body);
const post = (path, payload) => api.post(path, { body: payload });
const patch = (path, payload) => api.patch(path, { body: payload });

export default {
  postDevice: () => {
    const { deviceName, isDevice, linkingUrl, manifest } = Constants;
    return post('device', {
      deviceId,
      deviceName,
      isDevice,
      linkingUrl,
      version: manifest.version,
      country: DeviceInfo ? DeviceInfo.getTimezone() : null,
      timezone: (new Date()).getTimezoneOffset(),
      isTablet: DeviceInfo ? DeviceInfo.isTablet() : null,
    });
  },
  postAnswer: (answer) => {
    console.log('posting answer', answer);
    return post('answer', { ...answer, deviceId: Constants.deviceId })
      .catch(e => console.log('Post answer api', e, answer));
  },
  postSchedule: schedule => post('experiment', { schedule, deviceId: Constants.deviceId })
    .catch(e => console.log('Post experiment schedule', e, schedule)),
  postTrial: answer => post('trial', { ...answer, deviceId: Constants.deviceId })
    .catch(e => console.log('Post trial', e, answer)),
  postExperimentStarted: answer => post('experiment/started', { ...answer, deviceId: Constants.deviceId })
    .catch(e => console.log('Post experiment start', e, answer)),
  postExperimentAnswer: answer => post('experiment/answer', { ...answer, deviceId: Constants.deviceId })
    .catch(e => console.log('Post experiment ans', e, answer)),
  postExperimentRound: answer => post('experiment/round', { ...answer, deviceId: Constants.deviceId })
    .catch(e => console.log('Post experiment round', e, answer)),
  isDisqualified: () => get(`disqualified/${Constants.deviceId}`),
  postAll: state => post('all', { ...state, deviceId: Constants.deviceId })
    .catch(e => console.log('Post all', e)),
  disqualify: () => patch('disqualify', { deviceId: Constants.deviceId }),
};
