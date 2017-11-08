export let schedule; // eslint-disable-line import/no-mutable-exports

const hasTimeOut = (now, startTime) => (now - (startTime || schedule)) > 30 * 60000;

export const getNextScene = (nextScene, startTime, now = Date.now()) => {
  if (schedule && (!['RoutingScreen', 'SESSION TIMED OUT QUESTION'].includes(nextScene)) && hasTimeOut(now, startTime)) {
    return (nextScene === 'Question 1') ? 'SESSION TIMED OUT QUESTION' : 'SESSION TIMED OUT';
  }
  return nextScene || 'Question 1';
};

const getMatchingSchedule = (schedules, prevRoute, checkOnly) => {
  let route;
  const matchingSchedule = Object.entries(schedules)
    // eslint-disable-next-line no-unused-vars
    .sort(([time1, value1], [time2, value2]) => time1 - time2)
    .find(([time, value]) => !value.hasEnded); // eslint-disable-line no-unused-vars

  if (matchingSchedule) {
    const [scheduleStr, scheduleInfo] = matchingSchedule;
    const matchedSchedule = Number(scheduleStr);
    const now = Date.now();
    if (!checkOnly) {
      schedule = matchedSchedule;
    }
    if (matchedSchedule > now) {
      route = 'NotReady';
    } else {
      route = getNextScene(['SESSION TIMED OUT QUESTION', 'RoutingScreen'].includes(prevRoute) ? 'Question 1' : prevRoute,
        scheduleInfo.startTime, now);
    }
    console.log('route', route);
    return route;
  }
  return 'GetData';
};

export default getMatchingSchedule;
