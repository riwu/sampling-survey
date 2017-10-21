const getMatchingSchedule = (notificationSchedule) => {
  const currentTime = Date.now();
  return notificationSchedule.find(time => (currentTime >= time) &&
    ((currentTime - time) <= (60 * 60000)));
};

export default getMatchingSchedule;
