
const trialAttemptLeft = (state = 2, action) => {
  switch (action.type) {
    case 'LOWER_TRIAL_ATTEMPT':
      return state - 1;
    default:
      return state;
  }
};

export default trialAttemptLeft;
