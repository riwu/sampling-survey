const moment = require('moment');

const toDate = (time) => {
  const date = moment(time).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
  console.log('Converted', time, 'to', date);
  return date;
};
module.exports = toDate;
