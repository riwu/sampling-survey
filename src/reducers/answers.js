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
        [action.question]: action.index === undefined ? action.text : {
          ...state[action.question],
          [action.index]: action.text,
        },
      };
    default:
      return state;
  }
};

export default answers;
