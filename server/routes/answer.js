const toDate = require('./toDate');

const insertAnswer = (conn, req) => conn.query(
  'DELETE FROM answer WHERE device_deviceId = ? AND question = ?',
  [req.body.deviceId, req.body.question],
).then(() => {
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

export default insertAnswer;
