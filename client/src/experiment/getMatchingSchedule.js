const getMatchingSchedule = (schedules) => {
  const now = Date.now();
  let route;
  const matchingSchedule = Object.entries(schedules)
    // eslint-disable-next-line no-unused-vars
    .sort(([time1, value1], [time2, value2]) => time1 - time2)
    .find(([time, value]) => !value.hasEnded); // eslint-disable-line no-unused-vars

  if (matchingSchedule) {
    const [scheduleTime, schedule] = matchingSchedule;
    if (scheduleTime > now) {
      route = 'NotReady';
    } else {
      route = (now - (schedule.startTime || scheduleTime) > 30 * 60000) ? 'SESSION TIMED OUT' : 'Question 1';
    }
    return { route, schedule: scheduleTime, startTime: schedule.startTime };
  }
  route = 'RewardScreen';
  return { route };
};

export default getMatchingSchedule;
