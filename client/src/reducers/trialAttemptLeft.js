
const trialAttemptLeft = (state = 12, action) => {
  switch (action.type) {
    case 'LOWER_TRIAL_ATTEMPT':
      return state - 1;
    default:
      return state;
  }
};

export default trialAttemptLeft;
