const answers = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ANSWER_INDEX':
      return {
        ...state,
        [action.question]: {
          ...state[action.question],
          index: action.index,
        },
      };

    case 'SET_ANSWER_TEXT':
      return {
        ...state,
        [action.question]: {
          ...state[action.question],
          text: action.text,
        },
      };
    default:
      return state;
  }
};

export default answers;
