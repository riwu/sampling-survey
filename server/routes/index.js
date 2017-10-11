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
    .then(data => res.send(data));
});

router.post('/device', (req) => {
  connection.then(conn => conn.query('INSERT IGNORE INTO device SET ?', req.body));
});


module.exports = router;
