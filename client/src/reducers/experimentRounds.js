const experimentRounds = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_EXPERIMENT_ROUND': {
      const prevRounds = state[action.schedule];
      return {
        ...state,
        [action.schedule]: {
          ...prevRounds,
          [action.header]: {
            ...(prevRounds || {})[action.header],
            ...action.answer,
          },
        },
      };
    }

    default:
      return state;
  }
};

export default experimentRounds;
