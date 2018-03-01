import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

axios.defaults.baseURL = `${process.env.SAMPLING_API_URL}/`;

const deviceId = DeviceInfo.getUniqueID();

const deviceInfo = {
  deviceId,
  deviceName: DeviceInfo.getDeviceName(),
  isDevice: !DeviceInfo.isEmulator(),
  version: DeviceInfo.getVersion(),
  timezone: new Date().getTimezoneOffset(),
  country: DeviceInfo.getTimezone(),
  isTablet: DeviceInfo.isTablet(),
  model: DeviceInfo.getModel(),
};

const get = path => axios.get(path).then(response => response.data);

const [patch, put] = ['patch', 'put'].map(method => (path, payload) =>
  axios({
    method,
    url: path,
    data: { ...payload, deviceId },
  })
    .then(response => response.data)
    .catch((err) => {
      console.log('encountered error for', path, ':', (err.response || {}).data);
      throw new Error((err.response || {}).data);
    }));

export default {
  postDevice: () => put('device', deviceInfo),
  postAnswer: (answer) => {
    console.log('posting answer', answer);
    return put('answer', answer).catch(e => console.log('Post answer api', e, answer));
  },
  postSchedule: schedule =>
    put('experiment', { schedule }).catch(e =>
      console.log('Post experiment schedule', e, schedule)),
  postTrial: answer => put('trial', answer).catch(e => console.log('Post trial', e, answer)),
  postExperimentStarted: answer =>
    patch('experiment/started', answer).catch(e => console.log('Post experiment start', e, answer)),
  postExperimentAnswer: answer =>
    put('experiment/answer', answer).catch(e => console.log('Post experiment ans', e, answer)),
  postExperimentRound: answer =>
    put('experiment/round', answer).catch(e => console.log('Post experiment round', e, answer)),
  isDisqualified: () => get(`disqualified/${deviceId}`),
  postAll: state => put('all', { ...state, device: deviceInfo }),
  disqualify: () => patch('disqualify'),
};
