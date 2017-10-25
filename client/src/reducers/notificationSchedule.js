import getMatchingSchedule from '../experiment/getMatchingSchedule';

const notificationSchedule = (state = {}, action) => {
  switch (action.type) {
    case 'SCHEDULE_NOTIFICATION':
      return action.schedule.reduce((obj, time) => {
        obj[time] = {}; // eslint-disable-line no-param-reassign
        return obj;
      }, {});
    case 'EXPERIMENT_STARTED': {
      const { schedule, startTime } = getMatchingSchedule(state);
      return {
        ...state,
        [schedule]: {
          startTime: startTime || Date.now(),
        },
      };
    }

    case 'EXPERIMENT_ENDED':
      return {
        ...state,
        [action.schedule]: {
          hasEnded: true,
        },
      };
    default:
      return state;
  }
};

export default notificationSchedule;
