import axios from 'axios';

const API_BASE_URL = 'http://13.228.235.195:3002/';

const get = path => axios.get(API_BASE_URL + path).then(response => response.data);
const [post] = ['post'].map(method =>
  (path, payload) => axios({
    url: API_BASE_URL + path,
    method,
    data: payload,
  }).catch(e => console.log(e)));

export default {
  postDevice: device => post('device', device),
  postAnswer: answer => post('answer', answer),
  postExperimentAnswer: answer => post('experiment/answer', answer),
  postExperimentRound: answer => post('experiment/round', answer),
  isDisqualified: deviceId => get(`disqualified/${deviceId}`),
};
