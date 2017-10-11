
const deviceId = (state = null, action) => {
  switch (action.type) {
    case 'SET_DEVICE_ID':
      return action.deviceId;
    default:
      return state;
  }
};

export default deviceId;
