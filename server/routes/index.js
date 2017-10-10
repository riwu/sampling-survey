const express = require('express');
const mysql = require('promise-mysql');
const router = express.Router();

const connection = mysql.createConnection({
  host: 'indoxing.com',
  user: 'indoxi5_sampling',
  database: 'indoxi5_sampling',
  password: process.env.STUFF_PASSWORD,
});

router.get('/', (req, res, next) => {
  connection.then(conn => conn.query('SELECT * FROM answers')).then((data) => {
    res.send(data);
  });
});

module.exports = router;
