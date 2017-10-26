const notificationSchedule = (state = {}, action) => {
  switch (action.type) {
    case 'SCHEDULE_NOTIFICATION':
      return action.schedule.reduce((obj, time) => {
        obj[time] = {}; // eslint-disable-line no-param-reassign
        return obj;
      }, {});
    case 'EXPERIMENT_STARTED':
      return {
        ...state,
        [action.schedule]: {
          startTime: action.startedAt,
        },
      };
    case 'EXPERIMENT_ENDED':
      return {
        ...state,
        [action.schedule]: {
          ...state[action.schedule],
          hasEnded: true,
        },
      };
    default:
      return state;
  }
};

export default notificationSchedule;
