export let schedule; // eslint-disable-line import/no-mutable-exports

const hasTimeOut = (now, startTime) => (now - (startTime || schedule)) > 30 * 60000;

export const getNextScene = (nextScene, startTime, now = Date.now()) =>
  ((schedule && (nextScene !== 'RoutingScreen') && hasTimeOut(now, startTime)) ? 'SESSION TIMED OUT' : nextScene);

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
      route = getNextScene(prevRoute === 'SESSION TIMED OUT' ? 'Question 1' : (prevRoute || 'Question 1'),
        scheduleInfo.startTime, now);
    }
    return route;
  }
  return 'RewardScreen';
};

export default getMatchingSchedule;
