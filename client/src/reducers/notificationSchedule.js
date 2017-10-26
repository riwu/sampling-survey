import { schedule } from '../experiment/getMatchingSchedule';

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
        [schedule]: {
          startTime: Date.now(),
        },
      };
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
