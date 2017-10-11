import { Notifications } from 'expo';
import api from './api';

export const setAnswerIndex = (header, index) => ({
  type: 'SET_ANSWER_INDEX',
  header,
  index,
  time: Date.now(),
});

export const setAnswerText = ({ header, index, text }) => ({
  type: 'SET_ANSWER_TEXT',
  header,
  index,
  text,
  time: Date.now(),
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
      title: 'Complete your task now',
      body: 'Click here to access your time estimation task',
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
