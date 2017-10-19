const experimentAnswers = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_EXPERIMENT_ANSWER': {
      const prevQuestionAnswers = state[action.schedule];
      return {
        ...state,
        [action.schedule]: {
          ...prevQuestionAnswers,
          [action.header]: {
            ...(prevQuestionAnswers || {})[action.header],
            ...action.answer,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default experimentAnswers;
