export const setAnswerIndex = (question, index) => ({
  type: 'SET_ANSWER_INDEX',
  question,
  index,
});

export const setAnswerText = ({ question, index, text }) => ({
  type: 'SET_ANSWER_TEXT',
  question,
  index,
  text,
});
