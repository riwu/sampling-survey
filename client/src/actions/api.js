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

const [patch, put] = ['patch', 'put'].map(method => (path, data) =>
  axios({
    method,
    url: path,
    data,
  })
    .then(response => response.data)
    .catch((err) => {
      console.log('encountered error for', path, ':', (err.response || {}).data);
      throw new Error((err.response || {}).data);
    }));

export const isDisqualified = () => get(`disqualified/${deviceId}`);
export const disqualify = () => patch('disqualify', { deviceId });
export const postAll = (state, codeType) => put('all', { ...state, device: deviceInfo, codeType });
