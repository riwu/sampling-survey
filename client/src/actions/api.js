import axios from 'axios';
import { Constants } from 'expo';
import DeviceInfo from 'react-native-device-info';

axios.defaults.baseURL = 'http://13.228.235.195:3002/';
axios.defaults.baseURL = 'http://192.168.1.187:3002/';

const get = path => axios.get(path).then(response => response.data);

const [patch, put] = ['patch', 'put'].map(method =>
  (path, payload) => axios({
    method,
    url: path,
    data: payload,
  }).then(response => response.data)
    .catch((err) => {
      console.log('encountered error for', path, ':', (err.response || {}).data);
      throw new Error((err.response || {}).data);
    }));

const { deviceName, isDevice, linkingUrl, manifest } = Constants;
let deviceId;
let country;
let isTablet;
try {
  deviceId = DeviceInfo.getUniqueID();
  country = DeviceInfo.getTimezone();
  isTablet = DeviceInfo.isTablet();
} catch (e) {
  console.log('Unable to use DeviceInfo', e);
  deviceId = Constants.deviceId;
}

console.log('deviceId', deviceId, Constants.deviceId);
// TODO: temporary
patch('/updateDevice', { oldID: Constants.deviceId, newID: deviceId })
  .catch(e => console.log('updateDevice', e));

const deviceInfo = {
  deviceId,
  deviceName,
  isDevice,
  linkingUrl,
  version: manifest.version,
  timezone: (new Date()).getTimezoneOffset(),
  country,
  isTablet,
};

export default {
  postDevice: () => put('device', deviceInfo),
  postAnswer: (answer) => {
    console.log('posting answer', answer);
    return put('answer', { ...answer, deviceId })
      .catch(e => console.log('Post answer api', e, answer));
  },
  postSchedule: schedule => put('experiment', { schedule, deviceId })
    .catch(e => console.log('Post experiment schedule', e, schedule)),
  postTrial: answer => put('trial', { ...answer, deviceId })
    .catch(e => console.log('Post trial', e, answer)),
  postExperimentStarted: answer => patch('experiment/started', { ...answer, deviceId })
    .catch(e => console.log('Post experiment start', e, answer)),
  postExperimentAnswer: answer => put('experiment/answer', { ...answer, deviceId })
    .catch(e => console.log('Post experiment ans', e, answer)),
  postExperimentRound: answer => put('experiment/round', { ...answer, deviceId })
    .catch(e => console.log('Post experiment round', e, answer)),
  isDisqualified: () => get(`disqualified/${deviceId}`),
  postAll: state => put('all', { ...state, device: deviceInfo }),
  disqualify: () => patch('disqualify', { deviceId }),
};
