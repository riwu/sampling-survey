import axios from 'axios';
import { Constants } from 'expo';

const API_BASE_URL = 'http://13.228.235.195:3002/';

const get = path => axios.get(API_BASE_URL + path).then(response => response.data);
const [post] = ['post'].map(method =>
  (path, payload) => axios({
    url: API_BASE_URL + path,
    method,
    data: payload,
  }));

export default {
  postDevice: () => {
    const { deviceId, deviceName, isDevice, linkingUrl, manifest } = Constants;
    return post('device', {
      deviceId,
      deviceName,
      isDevice,
      linkingUrl,
      version: manifest.version,
    });
  },
  postAnswer: answer => post('answer', { ...answer, deviceId: Constants.deviceId })
    .catch(e => console.log('Post answer api', e, answer)),
  postExperimentAnswer: answer => post('experiment/answer', { ...answer, deviceId: Constants.deviceId })
    .catch(e => console.log('Post experiment ans', e, answer)),
  postExperimentRound: answer => post('experiment/round', { ...answer, deviceId: Constants.deviceId })
    .catch(e => console.log('Post experiment round', e, answer)),
  isDisqualified: () => get(`disqualified/${Constants.deviceId}`),
};
