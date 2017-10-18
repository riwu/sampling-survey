import Frisbee from 'frisbee';
import { Constants } from 'expo';

const API_BASE_URL = 'http://13.228.235.195:3002/';

const api = new Frisbee({
  baseURI: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const get = path => api.get(API_BASE_URL + path).then(response => response.data);
const post = (path, payload) => api.post(path, { body: payload });

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
  postAnswer: (answer) => {
    console.log('posting answer', answer);
    return post('answer', { ...answer, deviceId: Constants.deviceId })
      .catch(e => console.log('Post answer api', e, answer));
  },
  postSchedule: schedule => post('experiment', { schedule, deviceId: Constants.deviceId })
    .catch(e => console.log('Post experiment schedule', e, schedule)),
  postExperimentAnswer: answer => post('experiment/answer', { ...answer, deviceId: Constants.deviceId })
    .catch(e => console.log('Post experiment ans', e, answer)),
  postExperimentRound: answer => post('experiment/round', { ...answer, deviceId: Constants.deviceId })
    .catch(e => console.log('Post experiment round', e, answer)),
  isDisqualified: () => get(`disqualified/${Constants.deviceId}`),
};
