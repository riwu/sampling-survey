
const notificationSchedule = (state = [], action) => {
  switch (action.type) {
    case 'SCHEDULE_NOTIFICATION':
      return action.schedule;
    default:
      return state;
  }
};

export default notificationSchedule;
