const experimentRounds = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_EXPERIMENT_ROUND':
      return {
        ...state,
        [action.schedule]: [
          ...state[action.schedule] || [],
          action.answer,
        ],
      };
    case 'UPDATE_EXPERIMENT_ROUND': {
      const rounds = state[action.schedule];
      return {
        ...state,
        [action.schedule]: [
          ...rounds.slice(0, -1),
          {
            ...rounds[rounds.length - 1],
            ...action.answer,
          },
        ],
      };
    }
    default:
      return state;
  }
};

export default experimentRounds;
