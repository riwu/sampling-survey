const getResponseRate = (experimentAnswers) => {
  const answers = Object.values(experimentAnswers || {});
  if (answers.length === 0) return undefined;
  return Math.round((answers.filter(answer => !answer['SESSION TIMED OUT']).length / answers.length) * 100);
};

export default getResponseRate;
