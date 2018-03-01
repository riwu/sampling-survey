import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import * as api from './api';
import getNotificationSchedule from './getNotificationSchedule';
import { isSingle } from '../questionnaire/isEligible';

export const postAll = getCode => (dispatch, getState) => {
  const state = getState();
  return api.postAll(state, getCode && (isSingle(state) ? 'single' : 'relationship'));
};

export const setCode = code => ({
  type: 'SET_CODE',
  code,
});

export const disqualify = () => (dispatch) => {
  api.disqualify();
  return dispatch({
    type: 'DISQUALIFY',
  });
};

export const checkIfDisqualified = () => (dispatch) => {
  dispatch(postAll());
  return api
    .isDisqualified()
    .then((disqualified) => {
      console.log('disqualify', disqualified);
      if (disqualified) {
        dispatch(disqualify());
        Actions.replace('NotEligible');
      }
    })
    .catch((err) => {
      Alert.alert('Failed to verify device', 'Make sure you have Internet connection!');
      return err;
    });
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

export const addExperimentRound = (schedule, answer) => ({
  type: 'ADD_EXPERIMENT_ROUND',
  schedule,
  answer: {
    ...answer,
    time: Date.now(),
  },
});

export const updateExperimentRound = (schedule, answer) => ({
  type: 'UPDATE_EXPERIMENT_ROUND',
  schedule,
  answer,
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

export const experimentStarted = schedule => (dispatch) => {
  const startedAt = Date.now();
  dispatch({
    type: 'EXPERIMENT_STARTED',
    schedule,
    startedAt,
  });
};

export const experimentEnded = schedule => ({
  type: 'EXPERIMENT_ENDED',
  schedule,
});

export const experimentWarned = schedule => ({
  type: 'EXPERIMENT_WARNED',
  schedule,
});

export const scheduleNotification = answers => (dispatch) => {
  const finalSchedule = getNotificationSchedule(answers);
  dispatch({
    type: 'SCHEDULE_NOTIFICATION',
    schedule: finalSchedule,
  });
  return dispatch(postAll());
};
