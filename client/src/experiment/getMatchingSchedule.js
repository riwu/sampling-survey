import { FIRST_EXPERIMENT_ROUTE, LAST_TIME_OUT_QUESTION } from '../constants';

export let schedule; // eslint-disable-line import/no-mutable-exports

const hasTimeOut = (now, startTime) => now - (startTime || schedule) > 0 * 60000;

export const getNextScene = (nextScene, startTime, now = Date.now(), currentScene) => {
  if (currentScene === LAST_TIME_OUT_QUESTION) {
    return 'RoutingScreen';
  }
  if (schedule && !['RewardScreen', 'GetData'].includes(nextScene) && hasTimeOut(now, startTime)) {
    console.log('timed out');
    return 'SESSION TIMED OUT';
  }
  return nextScene || FIRST_EXPERIMENT_ROUTE;
};

const getMatchingSchedule = (schedules, prevRoute, checkOnly) => {
  const matchingSchedule = Object.entries(schedules)
    .sort(([time1], [time2]) => time1 - time2)
    .find(([, value]) => !value.hasEnded);

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
    route = getNextScene(prevRoute !== 'RoutingScreen' && prevRoute, scheduleInfo.startTime, now);
  }
  console.log('route', route);
  return route;
};

export default getMatchingSchedule;
