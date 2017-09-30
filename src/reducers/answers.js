const answers = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ANSWER_INDEX':
      return {
        ...state,
        [action.header]: {
          ...state[action.header],
          index: action.index,
        },
      };

    case 'SET_ANSWER_TEXT':
      return {
        ...state,
        [action.header]: action.index === undefined ? action.text : {
          ...state[action.header],
          [action.index]: action.text,
        },
      };
    default:
      return state;
  }
};

export default answers;
