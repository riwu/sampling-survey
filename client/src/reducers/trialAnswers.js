const trialAnswers = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW_TRIAL':
      return [
        ...state,
        action.answer,
      ];
    case 'UPDATE_TRIAL':
      return [
        ...state.slice(0, -1),
        {
          ...state[state.length - 1],
          ...action.answer,
        },
      ];
    default:
      return state;
  }
};

export default trialAnswers;
