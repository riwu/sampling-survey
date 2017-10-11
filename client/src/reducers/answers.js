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
    case 'ADD_NEW_ANSWER':
      return {
        ...state,
        [action.header]: [
          ...(state[action.header] || []),
          action.answer,
        ],
      };
    case 'UPDATE_ANSWER': {
      const answer = state[action.header] || [];
      return {
        ...state,
        [action.header]: [
          ...answer.slice(0, -1),
          {
            ...answer[answer.length - 1],
            ...action.answer,
          },
        ],
      };
    }
    default:
      return state;
  }
};

export default answers;
