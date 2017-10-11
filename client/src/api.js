
const API_BASE_URL = 'https://localhost:3001/';

const parseResponseBody = (response) => {
  const contentType = response.headers.get('Content-Type');

  if (!contentType) {
    return response.text();
  }

  return response.json();
};

const processResponse = (response) => {
  if (response.ok) {
    return parseResponseBody(response);
  }

  return parseResponseBody(response)
    .then(body => Promise.reject({
      body,
      status: response.status,
    }));
};

const get = path => fetch(API_BASE_URL + path).then(processResponse);

const [post] = ['POST'].map(method =>
  (path, payload) => fetch(API_BASE_URL + path, {
    method,
    body: JSON.stringify(payload),
  }).then(processResponse),
);

export default {
  postDevice: device => post('device', device),
  postAnswer: answer => post('answer', answer),
  isDisqualified: deviceId => get(`disqualified/${deviceId}`),
};
