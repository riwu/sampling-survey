const express = require('express');
const mysql = require('promise-mysql');

const router = express.Router();

const connection = mysql.createConnection({
  host: 'indoxing.com',
  user: 'indoxi5_sampling',
  database: 'indoxi5_sampling',
  password: process.env.STUFF_PASSWORD,
});

router.get('/disqualified/:deviceId', (req, res) => {
  connection
    .then(conn => conn.query('SELECT disqualified FROM device WHERE deviceId = ?', [req.params.deviceId]))
    .then(data => res.send(data)).catch(e => console.log(e));
});

router.post('/device', (req) => {
  connection.then(conn => conn.query('INSERT IGNORE INTO device SET ?', req.body)).catch(e => console.log(e));
});

router.post('/answer', (req) => {
  if (!req.body.answer) {
    return;
  }
  connection.then((conn) => {
    Object.entries(req.body.answer).forEach(([key, value]) => {
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
      if (isIndex) {
        conn.query('INSERT IGNORE INTO answer SET ?', row).catch(e => console.log(e));
      } else {
        conn.query('INSERT INTO answer SET ? ON DUPLICATE KEY UPDATE ?', [row, row]).catch(e => console.log(e));
      }
    });
  });
});

module.exports = router;
