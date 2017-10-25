export let schedule;
let startTime;

const hasTimeOut = now => (now - (startTime || schedule)) > 30 * 60000;

export const getNextScene = (nextScene, now = new Date()) =>
  ((schedule && hasTimeOut(now)) ? 'SESSION TIMED OUT' : nextScene);


const getMatchingSchedule = (schedules) => {
  let route;
  const matchingSchedule = Object.entries(schedules)
    // eslint-disable-next-line no-unused-vars
    .sort(([time1, value1], [time2, value2]) => time1 - time2)
    .find(([time, value]) => !value.hasEnded); // eslint-disable-line no-unused-vars

  if (matchingSchedule) {
    const [scheduleStr, scheduleInfo] = matchingSchedule;
    schedule = Number(scheduleStr);
    startTime = scheduleInfo.startTime;
    const now = Date.now();
    if (schedule > now) {
      route = 'NotReady';
    } else {
      route = getNextScene('Question 1', now);
    }
    return { route, schedule, startTime: scheduleInfo.startTime };
  }
  route = 'RewardScreen';
  return { route };
};

export default getMatchingSchedule;
