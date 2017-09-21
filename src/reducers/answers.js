const answers = (state = {}, { type, question, answer }) => {
  switch (type) {
    case 'SET_ANSWER':
      return {
        ...state,
        [question]: answer,
      };
    default:
      return state;
  }
};

export default answers;
