const express = require('express');
const mysql = require('promise-mysql');

const router = express.Router();

const connection = mysql.createConnection({
  host: 'mydbinstance.cbmbiclknx5e.ap-southeast-1.rds.amazonaws.com',
  user: 'sampling_survey',
  database: 'sampling_survey',
  password: process.env.STUFF_PASSWORD,
});

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
        // make sure 'index' comes first
        .sort(([key1, value1], [key2, value2]) => key2.localeCompare(key1))
        .forEach(([key, value]) => {
          if (key === 'time') return;
          const index = Number(key);
          const isIndex = key === 'index';
          const row = {
            device_deviceId: req.body.deviceId,
            question: req.body.question,
            index: isIndex ? value : index,
            text: isIndex ? undefined : value,
            final: isIndex || (req.body.answer.index ? req.body.answer.index === index : 1),
            createdAt: (new Date(req.body.answer.time)).toISOString(),
          };
          conn.query('INSERT INTO answer SET ? ON DUPLICATE KEY UPDATE ?', [row, row]).catch(e => console.log(e));
        });
    });
  });
});

router.post('experiment/answer', (req) => {
  console.log('Posting experiment answer', req.body);
  if (!req.body.answer) {
    return;
  }
  connection.then((conn) => {
    conn.query(
      'DELETE FROM experiment_answer WHERE experiment_device_deviceId = ? AND question = ? AND experiment_createdAt = ?',
      [req.body.deviceId, req.body.question, req.body.createdAt],
    ).then(() => {
      (req.body.question === 'Question 1'
        ? conn.query('INSERT INTO experiment VALUES(?, ?, DEFAULT)', [req.body.deviceId, req.body.createdAt])
        : Promise.resolve()).then(() => {
        console.log('Inserting experiment answer', req.body);
        Object.entries(req.body.answer)
        // make sure 'index' comes first
          .sort(([key1, value1], [key2, value2]) => key2.localeCompare(key1))
          .forEach(([key, value]) => {
            if (key === 'time') return;
            const index = Number(key);
            const isIndex = key === 'index';
            const row = {
              experiment_device_deviceId: req.body.deviceId,
              question: req.body.question,
              index: isIndex ? value : index,
              text: isIndex ? undefined : value,
              final: isIndex || (req.body.answer.index ? req.body.answer.index === index : 1),
              createdAt: (new Date(req.body.answer.time)).toISOString(),
              experiment_createdAt: req.body.createdAt,
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
        round, blackDuration, redDuration, recordedDuration, deviceId, time,
      } = req.body;
      const row = {
        experiment_device_deviceId: deviceId,
        round,
        blackDuration,
        redDuration,
        recordedDuration,
        createdAt: (new Date(time)).toISOString(),
        experiment_createdAt: req.body.createdAt,
      };
      console.log('Inserting experiment round', req.body);
      conn.query('INSERT INTO answer SET ? ON DUPLICATE KEY UPDATE ?', [row, row]).catch(e => console.log(e));
    });
  });
});

module.exports = router;
