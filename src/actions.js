export const setAnswerIndex = (question, index) => ({
  type: 'SET_ANSWER_INDEX',
  question,
  index,
});

export const setAnswerText = (question, text) => ({
  type: 'SET_ANSWER_TEXT',
  question,
  text,
});
