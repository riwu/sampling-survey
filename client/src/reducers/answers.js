const answers = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ANSWER_INDEX':
      return {
        ...state,
        [action.header]: {
          ...state[action.header],
          index: action.index,
          time: action.time,
        },
      };
    case 'SET_ANSWER_TEXT':
      return {
        ...state,
        [action.header]: {
          ...state[action.header],
          [action.index === undefined ? -1 : action.index]: action.text,
          time: action.time,
        },
      };
    default:
      return state;
  }
};

export default answers;
