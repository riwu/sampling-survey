const experimentRounds = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_EXPERIMENT_ROUND':
      return {
        ...state,
        [action.schedule]: {
          [action.header]: {
            ...(state[action.schedule] || {})[action.header],
            ...action.answer,
          },
        },
      };
    default:
      return state;
  }
};

export default experimentRounds;
