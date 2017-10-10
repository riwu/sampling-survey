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
