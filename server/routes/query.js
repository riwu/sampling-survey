const mysql = require('promise-mysql');
const moment = require('moment');

const toDate = (time) => {
  const date = moment(Number(time))
    .utcOffset(8)
    .format('YYYY-MM-DD HH:mm:ss');
  return date;
};

const conn = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: 'synergy_hunger',
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
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
  getCode: codeType =>
    conn.query('SELECT ?? FROM code', codeType).then(row => (row[0] || {})[codeType]),
  insertSession: session =>
    conn.query('INSERT INTO session SET ? ON DUPLICATE KEY UPDATE ?', [session, session]),
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
  getAnswer: () =>
    conn.query('SELECT deviceId, CONVERT(SUBSTRING(question, 10), UNSIGNED INTEGER) AS question, ' +
        '`index`, text FROM answer WHERE final = 1 AND question NOT IN ("Acknowledgement", ' +
        '"ConsentForm") AND createdAt > "2018-04-01 00:00:00"'),
  getExperimentAnswer: () =>
    conn.query('SELECT deviceId, schedule, question, `index`, text FROM experiment_answer' +
        ' WHERE final = 1 AND createdAt > "2018-04-01 00:00:00" ORDER BY createdAt'),
  // order by createdAt so that schedule and round order (for repeat) is correct
  getRounds: () =>
    conn.query('SELECT deviceId, round, blackDuration, redDuration, recordedDuration, timeBetweenMountAndStart, schedule' +
        ' FROM round WHERE createdAt > "2018-04-01 00:00:00" ORDER BY createdAt'),
};
