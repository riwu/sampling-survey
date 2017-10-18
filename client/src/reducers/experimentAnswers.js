const experimentAnswers = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EXPERIMENT_ANSWER': {
      if (action.header === 'Question 1') {
        return [
          ...state,
          {
            [action.header]: action.answer,
          },
        ];
      }
      const answer = state[state.length - 1];
      return [
        ...state.slice(0, -1),
        {
          ...answer,
          [action.header]: {
            ...answer[action.header],
            ...action.answer,
          },
        },
      ];
    }

    default:
      return state;
  }
};

export default experimentAnswers;
