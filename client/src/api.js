import axios from 'axios';

const API_BASE_URL = 'http://ec2-13-59-83-7.us-east-2.compute.amazonaws.com:3001/';

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
  isDisqualified: deviceId => get(`disqualified/${deviceId}`),
};
