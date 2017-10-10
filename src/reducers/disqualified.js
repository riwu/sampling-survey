
const disqualified = (state = false, action) => {
  switch (action.type) {
    case 'DISQUALIFY':
      return true;
    default:
      return state;
  }
};

export default disqualified;
