const toDate = require('./toDate');

const insertAnswer = (conn, data) => conn.query(
  'DELETE FROM answer WHERE device_deviceId = ? AND question = ?',
  [data.deviceId, data.question],
).then(() => {
  console.log('Inserting answer');
  Object.entries(data.answer)
    .forEach(([key, value]) => {
      if (key === 'time') return;
      const isIndex = key === 'index';
      if (isIndex && data.answer[value] !== undefined) return;
      const index = Number(key);
      const row = {
        device_deviceId: data.deviceId,
        question: data.question,
        index: isIndex ? value : index,
        text: isIndex ? undefined : value,
        final: isIndex || (data.answer.index ? data.answer.index === index : 1),
        createdAt: toDate(data.answer.time),
      };
      conn.query('INSERT INTO answer SET ? ON DUPLICATE KEY UPDATE ?', [row, row]).catch(e => console.log(e));
    });
});

module.exports = insertAnswer;
