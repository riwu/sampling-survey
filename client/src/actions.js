import { Notifications } from 'expo';
import { Actions } from 'react-native-router-flux';
import api from './api';

export const disqualify = () => ({
  type: 'DISQUALIFY',
});

export const postDevice = () => (dispatch) => {
  api.isDisqualified().then((row) => {
    if ((row[0] || {}).disqualified) {
      dispatch(disqualify());
      Actions.replace('NotEligible');
    }
  }).catch(e => console.log('Check disqualified action', e));

  api.postDevice().catch(e => console.log('Post device action', e));
};

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

export const addExperimentAnswer = (header, schedule, answer) => ({
  type: 'ADD_EXPERIMENT_ANSWER',
  header,
  schedule,
  answer: {
    ...answer,
    time: Date.now(),
  },
});

export const addExperimentRound = (header, schedule, answer) => ({
  type: 'ADD_EXPERIMENT_ROUND',
  header,
  schedule,
  answer: {
    ...answer,
    time: Date.now(),
  },
});

export const addNewTrial = answer => ({
  type: 'ADD_NEW_TRIAL',
  answer: {
    ...answer,
    time: Date.now(),
  },
});

export const updateTrial = answer => ({
  type: 'UPDATE_TRIAL',
  answer,
});

export const lowerTrialAttempt = () => ({
  type: 'LOWER_TRIAL_ATTEMPT',
});

export const scheduleNotification = answers => (dispatch) => {
  console.log('schedule ans', answers);
  const schedule = [Date.now() + 20000, Date.now() + 5 * 60000];
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

  Notifications.addListener(() => {
    console.log('received notification');
    Actions.replace('RoutingScreen');
  });

  dispatch({
    type: 'SCHEDULE_NOTIFICATION',
    schedule,
  });
  api.postSchedule(schedule);
};
