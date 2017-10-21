const moment = require('moment');

const toDate = time => moment(time).format('YYYY-MM-DD HH:mm:ss');
module.exports = toDate;
