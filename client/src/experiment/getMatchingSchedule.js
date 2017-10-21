const getMatchingSchedule = (notificationSchedule) => {
  const currentTime = Date.now();
  return notificationSchedule.slice().reverse().find(time => (currentTime >= time) &&
    ((currentTime - time) <= (60 * 60000)));
};

export default getMatchingSchedule;
