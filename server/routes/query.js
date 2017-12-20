const mysql = require('promise-mysql');
const moment = require('moment');

const toDate = (time) => {
  const date = moment(Number(time))
    .utcOffset(8)
    .format('YYYY-MM-DD HH:mm:ss');
  return date;
};

let conn;
mysql
  .createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: 'sampling_survey',
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
  })
  .then((connection) => {
    conn = connection;
  });

const insertAnswer = (answer, isExperiment) =>
  Promise.all(Object.entries(answer.answer)
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
      const table = isExperiment ? 'experiment_answer' : 'answer';
      const experimentMatch = isExperiment ? ' AND schedule = ?' : '';
      return conn
        .query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [row, row])
        .then(() =>
          conn.query(
            `DELETE FROM ${table} WHERE deviceId = ? AND question = ? AND createdAt < ?${experimentMatch}`,
            [row.deviceId, row.question, row.createdAt, row.schedule],
          ));
    }));

const insertRound = trial => (answer) => {
  const {
    round,
    blackDuration,
    redDuration,
    recordedDuration,
    timeBetweenMountAndStart,
    deviceId,
    time,
    schedule,
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
  return conn.query(`INSERT INTO ${trial ? 'trial' : 'round'} SET ? ON DUPLICATE KEY UPDATE ?`, [
    row,
    row,
  ]);
};

module.exports = {
  getCode: codeType => conn.query('SELECT ?? FROM mturk_code', codeType),
  isDisqualified: deviceId =>
    conn.query('SELECT disqualified FROM device WHERE deviceId = ?', deviceId),
  device: answer =>
    conn.query('INSERT INTO device SET ? ON DUPLICATE KEY UPDATE ?', [answer, answer]),
  disqualify: deviceId =>
    conn.query('UPDATE device SET disqualified = 1 WHERE deviceId = ?', deviceId),
  answer: answer => insertAnswer(answer, false),
  experimentAnswer: answer => insertAnswer(answer, true),
  trial: insertRound(true),
  experimentRounds: insertRound(false),
  experiment: (schedule, deviceId) =>
    Promise.all(schedule.map((time) => {
      const row = { deviceId, schedule: toDate(time) };
      return conn.query(
        'INSERT INTO experiment SET ? ON DUPLICATE KEY UPDATE deviceId = deviceId',
        row,
      );
    })),
  experimentStarted: answer =>
    conn.query('UPDATE experiment SET startedAt = ? WHERE deviceId = ? AND schedule = ?', [
      toDate(answer.startedAt),
      answer.deviceId,
      toDate(answer.schedule),
    ]),
};
