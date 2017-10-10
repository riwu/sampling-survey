import { Notifications } from 'expo';

export const setAnswerIndex = (header, index) => ({
  type: 'SET_ANSWER_INDEX',
  header,
  index,
});

export const setAnswerText = ({ header, index, text }) => ({
  type: 'SET_ANSWER_TEXT',
  header,
  index,
  text,
});

export const addNewAnswer = ({ header, answer }) => ({
  type: 'ADD_NEW_ANSWER',
  header,
  answer,
});

export const updateAnswer = ({ header, answer }) => ({
  type: 'UPDATE_ANSWER',
  header,
  answer,
});

export const disqualify = () => ({
  type: 'DISQUALIFY',
});

export const lowerTrialAttempt = () => ({
  type: 'LOWER_TRIAL_ATTEMPT',
});

export const scheduleNotification = () => (dispatch) => {
  const schedule = [Date.now() + 20000];
  schedule.forEach(time =>
    Notifications.scheduleLocalNotificationAsync({
      title: 'Experience Sampling Studies',
      body: 'Press this to perform the experiment now',
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'max',
        vibrate: true,
      },
    }, {
      time,
    }));
  dispatch({
    type: 'SCHEDULE_NOTIFICATION',
    schedule,
  });
};
