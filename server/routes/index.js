const express = require('express');
const mysql = require('promise-mysql');
const toDate = require('./toDate');
const insertAnswer = require('./answer');

const router = express.Router();

const connection = mysql.createConnection({
  host: 'mydbinstance.cbmbiclknx5e.ap-southeast-1.rds.amazonaws.com',
  user: 'sampling_survey',
  database: 'sampling_survey',
  port: 1150,
  password: process.env.STUFF_PASSWORD,
});

router.post('/all', (req, res) => {
  res.end();
  connection.then((conn) => {
    Object.entries(req.body.answers || {}).forEach(([question, answer]) => {
      insertAnswer(conn, {
        answer,
        question,
        deviceId: req.body.deviceId,
      });
    });
  });
});

router.patch('/disqualify', (req, res) => {
  res.end();
  connection.then((conn) => {
    console.log('Inserting disqualify');
    conn.query('UPDATE device SET disqualified = 1 WHERE deviceId = ?', [req.body.deviceId]);
  });
});

router.get('/disqualified/:deviceId', (req, res) => {
  connection
    .then(conn => conn.query('SELECT disqualified FROM device WHERE deviceId = ?', [req.params.deviceId]))
    .then((data) => {
      console.log('Sending data', data);
      return res.send(data);
    }).catch(e => console.log(e));
});

router.post('/device', (req, res) => {
  res.end();
  connection.then((conn) => {
    console.log('Inserting device');
    return conn.query('INSERT IGNORE INTO device SET ?', req.body);
  }).catch(e => console.log(e));
});

router.post('/answer', (req, res) => {
  res.end();
  if (!req.body.answer) {
    return;
  }
  connection.then((conn) => {
    insertAnswer(conn, req.body);
  });
});

router.post('/trial', (req, res) => {
  res.end();
  connection.then((conn) => {
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
    console.log('Inserting trial round');
    conn.query('INSERT INTO trial SET ?', [row]).catch(e => console.log(e));
  });
});

router.post('/experiment', (req, res) => {
  res.end();
  connection.then((conn) => {
    console.log('Inserting experiment schedule');
    req.body.schedule.forEach(time => conn.query(
      'INSERT INTO experiment VALUES(?, ?, DEFAULT)',
      [req.body.deviceId, toDate(time)],
    ));
  });
});

router.post('/experiment/answer', (req, res) => {
  res.end();
  if (!req.body.answer) {
    return;
  }
  connection.then((conn) => {
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
          conn.query('INSERT INTO experiment_answer SET ? ON DUPLICATE KEY UPDATE ?', [row, row]).catch(e => console.log(e));
        });
    });
  });
});

router.post('/experiment/round', (req, res) => {
  res.end();
  connection.then((conn) => {
    const {
      round, blackDuration, redDuration, recordedDuration, timeBetweenMountAndStart, deviceId, time, schedule,
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
    console.log('Inserting experiment round');
    conn.query('INSERT INTO round SET ? ON DUPLICATE KEY UPDATE ?', [row, row]).catch(e => console.log(e));
  });
});

module.exports = router;
