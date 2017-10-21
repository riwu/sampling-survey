const moment = require('moment');

const toDate = time => moment(time).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
module.exports = toDate;
