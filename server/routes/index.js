const express = require('express');
const mysql = require('promise-mysql');
const toDate = require('./toDate');
const insertAnswer = require('./answer');

const router = express.Router();

let conn;
mysql.createConnection({
  host: 'mydbinstance.cbmbiclknx5e.ap-southeast-1.rds.amazonaws.com',
  user: 'sampling_survey',
  database: 'sampling_survey',
  port: 1150,
  password: process.env.STUFF_PASSWORD,
}).then((connection) => { conn = connection; });

router.post('/all', (req, res) => {
  res.end();
  Object.entries(req.body.answers || {}).forEach(([question, answer]) => {
    insertAnswer(conn, {
      answer,
      question,
      deviceId: req.body.deviceId,
    });
  });
});

router.patch('/disqualify', (req, res) => {
  res.end();
  conn.query('UPDATE device SET disqualified = 1 WHERE deviceId = ?', [req.body.deviceId]);
});

router.get('/disqualified/:deviceId', (req, res) => {
  conn.query('SELECT disqualified FROM device WHERE deviceId = ?', [req.params.deviceId])
    .then((data) => {
      console.log('Sending data', data);
      return res.send(data);
    });
});

router.post('/device', (req, res) => {
  res.end();
  conn.query('INSERT INTO device SET ? ON DUPLICATE KEY UPDATE ?', [req.body, req.body]);
});

router.post('/answer', (req, res) => {
  res.end();
  if (!req.body.answer) {
    return;
  }
  insertAnswer(conn, req.body);
});

router.post('/trial', (req, res) => {
  res.end();
  const {
    round, blackDuration, redDuration, recordedDuration, timeBetweenMountAndStart, deviceId, time,
  } = req.body;
  const row = {
    device_deviceId: deviceId,
    round,
    blackDuration,
    redDuration,
    recordedDuration,
    timeBetweenMountAndStart,
    createdAt: toDate(time),
  };
  conn.query('INSERT INTO trial SET ?', [row]);
});

router.post('/experiment', (req, res) => {
  res.end();
  req.body.schedule.forEach((time) => {
    const row = { device_deviceId: req.body.deviceId, schedule: toDate(time) };
    conn.query('INSERT IGNORE INTO experiment SET ?', row);
  });
});

router.post('/experiment/started', (req, res) => {
  res.end();
  conn.query(
    'UPDATE experiment SET startedAt = ? WHERE device_deviceId = ? AND schedule = ?',
    [toDate(req.body.startedAt), req.body.deviceId, toDate(req.body.schedule)],
  );
});

router.post('/experiment/answer', (req, res) => {
  res.end();
  if (!req.body.answer) {
    return;
  }
  conn.query(
    'DELETE FROM experiment_answer WHERE experiment_device_deviceId = ? AND question = ? AND experiment_schedule = ?',
    [req.body.deviceId, req.body.question, toDate(req.body.schedule)],
  ).then(() => {
    console.log('Inserting experiment answer');
    Object.entries(req.body.answer)
      .forEach(([key, value]) => {
        if (key === 'time') return;
        const isIndex = key === 'index';
        if (isIndex && req.body.answer[value] !== undefined) return;
        const index = Number(key);
        const row = {
          experiment_device_deviceId: req.body.deviceId,
          question: req.body.question,
          index: isIndex ? value : index,
          text: isIndex ? undefined : value,
          final: isIndex || (req.body.answer.index ? req.body.answer.index === index : 1),
          createdAt: toDate(req.body.answer.time),
          experiment_schedule: toDate(req.body.schedule),
        };
        conn.query('INSERT INTO experiment_answer SET ? ON DUPLICATE KEY UPDATE ?', [row, row]);
      });
  });
});

router.post('/experiment/round', (req, res) => {
  res.end();
  const {
    round, blackDuration, redDuration, recordedDuration,
    timeBetweenMountAndStart, deviceId, time, schedule,
  } = req.body;
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
  conn.query('INSERT INTO round SET ? ON DUPLICATE KEY UPDATE ?', [row, row]);
});

module.exports = router;
