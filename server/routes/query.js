const mysql = require('promise-mysql');
const moment = require('moment');

const toDate = (time) => {
  const date = moment(Number(time)).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
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

const insertAnswer = (answer, isExperiment) => Promise.all(Object.entries(answer.answer)
  .filter(([key, value]) => key !== 'time' && (key !== 'index' || answer.answer[value] === undefined))
  .map(([key, value]) => {
    const isIndex = key === 'index';
    const index = Number(key);
    const row = {
      deviceId: answer.deviceId,
      question: answer.question,
      index: isIndex ? value : index,
      text: isIndex ? undefined : value,
      final: isIndex || (answer.answer.index ? answer.answer.index === index : 1),
      createdAt: toDate(answer.answer.time),
    };
    if (isExperiment) {
      row.schedule = toDate(answer.schedule);
    }
    return conn.query(`INSERT INTO ${isExperiment ? 'experiment_answer' : 'answer'} SET ?`, row);
  }));

const insertRound = trial => (answer) => {
  const {
    round, blackDuration, redDuration, recordedDuration,
    timeBetweenMountAndStart, deviceId, time, schedule,
  } = answer;
  const row = {
    deviceId,
    round,
    blackDuration,
    redDuration,
    recordedDuration,
    timeBetweenMountAndStart,
    createdAt: toDate(time),
  };
  if (!trial) {
    row.schedule = toDate(schedule);
  }
  return conn.query(`INSERT INTO ${trial ? 'trial' : 'round'} SET ? ON DUPLICATE KEY UPDATE ?`, [row, row]);
};

module.exports = {
  getCode: () => conn.query('SELECT * FROM mturk_code'),
  isDisqualified: deviceId => conn.query('SELECT disqualified FROM device WHERE deviceId = ?', deviceId),
  device: answer => conn.query('INSERT INTO device SET ? ON DUPLICATE KEY UPDATE ?', [answer, answer]),
  disqualify: deviceId => conn.query('UPDATE device SET disqualified = 1 WHERE deviceId = ?', deviceId),
  answer: answer => conn.query(
    'DELETE FROM answer WHERE deviceId = ? AND question = ?',
    [answer.deviceId, answer.question],
  ).then(() => insertAnswer(answer, false)),
  experimentAnswer: answer => conn.query(
    'DELETE FROM experiment_answer WHERE deviceId = ? AND question = ? AND schedule = ?',
    [answer.deviceId, answer.question, toDate(answer.schedule)],
  ).then(() => insertAnswer(answer, true)),
  trial: insertRound(true),
  experimentRounds: insertRound(false),
  experiment: (schedule, deviceId) => Promise.all(schedule.map((time) => {
    const row = { deviceId, schedule: toDate(time) };
    return conn.query('INSERT INTO experiment SET ? ON DUPLICATE KEY UPDATE deviceId = deviceId', row);
  })),
  experimentStarted: answer => conn.query(
    'UPDATE experiment SET startedAt = ? WHERE deviceId = ? AND schedule = ?',
    [toDate(answer.startedAt), answer.deviceId, toDate(answer.schedule)],
  ),
  updateDevice: ({ oldID, newID }) => conn.query('UPDATE device SET deviceId = ? WHERE deviceId = ?', [newID, oldID]),
};
