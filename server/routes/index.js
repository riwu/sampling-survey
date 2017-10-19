const express = require('express');
const mysql = require('promise-mysql');

const router = express.Router();

const connection = mysql.createConnection({
  host: 'mydbinstance.cbmbiclknx5e.ap-southeast-1.rds.amazonaws.com',
  user: 'sampling_survey',
  database: 'sampling_survey',
  port: 1150,
  password: process.env.STUFF_PASSWORD,
});

const toDate = time => (new Date(time)).toISOString();

router.get('/disqualified/:deviceId', (req, res) => {
  connection
    .then(conn => conn.query('SELECT disqualified FROM device WHERE deviceId = ?', [req.params.deviceId]))
    .then(data => res.send(data)).catch(e => console.log(e));
});

router.post('/device', (req) => {
  console.log('Posting device', req.body);
  connection.then((conn) => {
    console.log('Inserting device', req.body);
    return conn.query('INSERT IGNORE INTO device SET ?', req.body);
  }).catch(e => console.log(e));
});

router.post('/answer', (req) => {
  console.log('Posting answer', req.body);
  if (!req.body.answer) {
    return;
  }
  connection.then((conn) => {
    conn.query('DELETE FROM answer WHERE device_deviceId = ? AND question = ?', [req.body.deviceId, req.body.question]).then(() => {
      console.log('Inserting answer', req.body);
      Object.entries(req.body.answer)
        .forEach(([key, value]) => {
          if (key === 'time') return;
          const isIndex = key === 'index';
          if (isIndex && req.body.answer[value] !== undefined) return;
          const index = Number(key);
          const row = {
            device_deviceId: req.body.deviceId,
            question: req.body.question,
            index: isIndex ? value : index,
            text: isIndex ? undefined : value,
            final: isIndex || (req.body.answer.index ? req.body.answer.index === index : 1),
            createdAt: toDate(req.body.answer.time),
          };
          conn.query('INSERT INTO answer SET ? ON DUPLICATE KEY UPDATE ?', [row, row]).catch(e => console.log(e));
        });
    });
  });
});

router.post('trial', (req) => {
  console.log('Posting trial', req.body);
  connection.then((conn) => {
    const {
      round, blackDuration, redDuration, recordedDuration, deviceId, time,
    } = req.body;
    const row = {
      device_deviceId: deviceId,
      round,
      blackDuration,
      redDuration,
      recordedDuration,
      createdAt: toDate(time),
    };
    console.log('Inserting trial round', req.body);
    conn.query('INSERT INTO trial SET ?', [row]).catch(e => console.log(e));
  });
});

router.post('experiment', (req) => {
  console.log('Posting experiment schedule', req.body);
  connection.then(conn => req.body.schedule.forEach(time => conn.query(
    'INSERT INTO experiment VALUES(?, ?, DEFAULT)',
    [req.body.deviceId, toDate(time)],
  )));
});

router.post('experiment/answer', (req) => {
  console.log('Posting experiment answer', req.body);
  if (!req.body.answer) {
    return;
  }
  connection.then((conn) => {
    conn.query(
      'DELETE FROM experiment_answer WHERE experiment_device_deviceId = ? AND question = ? AND experiment_schedule = ?',
      [req.body.deviceId, req.body.question, toDate(req.body.schedule)],
    ).then(() => {
      console.log('Inserting experiment answer', req.body);
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
          conn.query('INSERT INTO answer SET ? ON DUPLICATE KEY UPDATE ?', [row, row]).catch(e => console.log(e));
        });
    });
  });
});

router.post('experiment/round', (req) => {
  console.log('Posting experiment round', req.body);
  connection.then((conn) => {
    const {
      round, blackDuration, redDuration, recordedDuration, deviceId, time, schedule,
    } = req.body;
    const row = {
      experiment_device_deviceId: deviceId,
      round,
      blackDuration,
      redDuration,
      recordedDuration,
      createdAt: toDate(time),
      experiment_schedule: toDate(schedule),
    };
    console.log('Inserting experiment round', req.body);
    conn.query('INSERT INTO answer SET ? ON DUPLICATE KEY UPDATE ?', [row, row]).catch(e => console.log(e));
  });
});

module.exports = router;
