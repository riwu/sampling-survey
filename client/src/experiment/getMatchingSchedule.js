import { FIRST_EXPERIMENT_ROUTE } from '../constants';

export let schedule; // eslint-disable-line import/no-mutable-exports

const hasTimeOut = (now, startTime) => now - (startTime || schedule) > 30 * 60000;

export const getNextScene = (nextScene, startTime, now = Date.now()) => {
  if (schedule && !['RewardScreen', 'GetData'].includes(nextScene) && hasTimeOut(now, startTime)) {
    return 'SESSION TIMED OUT';
  }
  return (nextScene !== 'RoutingScreen' && nextScene) || FIRST_EXPERIMENT_ROUTE;
};

const getMatchingSchedule = (schedules, prevRoute, checkOnly) => {
  const matchingSchedule = Object.entries(schedules)
    // eslint-disable-next-line no-unused-vars
    .sort(([time1, value1], [time2, value2]) => time1 - time2)
    .find(([time, value]) => !value.hasEnded); // eslint-disable-line no-unused-vars

  if (!matchingSchedule) {
    return 'GetData';
  }
  const [scheduleStr, scheduleInfo] = matchingSchedule;
  const matchedSchedule = Number(scheduleStr);
  if (!checkOnly) {
    schedule = matchedSchedule;
  }
  const now = Date.now();
  let route;
  if (matchedSchedule > now) {
    route = 'NotReady';
  } else {
    route = getNextScene(prevRoute, scheduleInfo.startTime, now);
  }
  console.log('route', route);
  return route;
};

export default getMatchingSchedule;
