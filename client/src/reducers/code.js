const code = (state = null, action) => {
  switch (action.type) {
    case 'SET_CODE':
      return action.code;
    default:
      return state;
  }
};

export default code;
