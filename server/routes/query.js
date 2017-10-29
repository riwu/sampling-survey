const mysql = require('promise-mysql');
const moment = require('moment');

const toDate = (time) => {
  const date = moment(time).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
  console.log('Converted', time, 'to', date);
  return date;
};

let conn;
mysql.createConnection({
  host: 'mydbinstance.cbmbiclknx5e.ap-southeast-1.rds.amazonaws.com',
  user: 'sampling_survey',
  database: 'sampling_survey',
  port: 1150,
  password: process.env.STUFF_PASSWORD,
}).then((connection) => { conn = connection; });

module.exports = {
  isDisqualified: deviceId => conn.query('SELECT disqualified FROM device WHERE deviceId = ?', deviceId),
  device: answer => conn.query('INSERT INTO device SET ? ON DUPLICATE KEY UPDATE ?', [answer, answer]),
  disqualify: deviceId => conn.query('UPDATE device SET disqualified = 1 WHERE deviceId = ?', deviceId),
  answer: data => conn.query(
    'DELETE FROM answer WHERE device_deviceId = ? AND question = ?',
    [data.deviceId, data.question],
  ).then(() => Promise.all(Object.entries(data.answer)
    .filter(([key, value]) => key !== 'time' && (key !== 'index' || data.answer[value] === undefined))
    .map(([key, value]) => {
      const isIndex = key === 'index';
      const index = Number(key);
      const row = {
        device_deviceId: data.deviceId,
        question: data.question,
        index: isIndex ? value : index,
        text: isIndex ? undefined : value,
        final: isIndex || (data.answer.index ? data.answer.index === index : 1),
        createdAt: toDate(data.answer.time),
      };
      return conn.query('INSERT INTO answer SET ? ON DUPLICATE KEY UPDATE ?', [row, row]).catch(e => console.log(e));
    }))),
  trial: (answer) => {
    const {
      round, blackDuration, redDuration, recordedDuration, timeBetweenMountAndStart, deviceId, time,
    } = answer;
    const row = {
      device_deviceId: deviceId,
      round,
      blackDuration,
      redDuration,
      recordedDuration,
      timeBetweenMountAndStart,
      createdAt: toDate(time),
    };
    return conn.query('INSERT IGNORE INTO trial SET ?', row);
  },
  experiment: (schedule, deviceId) => schedule.map((time) => {
    const row = { device_deviceId: deviceId, schedule: toDate(time) };
    return conn.query('INSERT IGNORE INTO experiment SET ?', row);
  }),
  experimentStarted: answer => conn.query(
    'UPDATE experiment SET startedAt = ? WHERE device_deviceId = ? AND schedule = ?',
    [toDate(answer.startedAt), answer.deviceId, toDate(answer.schedule)],
  ),
  experimentAnswer: answer => conn.query(
    'DELETE FROM experiment_answer WHERE experiment_device_deviceId = ? AND question = ? AND experiment_schedule = ?',
    [answer.deviceId, answer.question, toDate(answer.schedule)],
  ).then(() => {
    console.log('Inserting experiment answer');
    return Promise.all(Object.entries(answer.answer)
      .filter(([key, value]) => key !== 'time' && (key !== 'index' || answer.answer[value] === undefined))
      .map(([key, value]) => {
        const isIndex = key === 'index';
        const index = Number(key);
        const row = {
          experiment_device_deviceId: answer.deviceId,
          question: answer.question,
          index: isIndex ? value : index,
          text: isIndex ? undefined : value,
          final: isIndex || (answer.answer.index ? answer.answer.index === index : 1),
          createdAt: toDate(answer.answer.time),
          experiment_schedule: toDate(answer.schedule),
        };
        return conn.query('INSERT INTO experiment_answer SET ? ON DUPLICATE KEY UPDATE ?', [row, row]);
      }));
  }),
  experimentRounds: (answer) => {
    const {
      round, blackDuration, redDuration, recordedDuration,
      timeBetweenMountAndStart, deviceId, time, schedule,
    } = answer;
    const row = {
      experiment_device_deviceId: deviceId,
      round,
      blackDuration,
      redDuration,
      recordedDuration,
      timeBetweenMountAndStart,
      createdAt: toDate(time),
      experiment_schedule: toDate(schedule),
    };
    return conn.query('INSERT IGNORE INTO round SET ?', row);
  },
};
