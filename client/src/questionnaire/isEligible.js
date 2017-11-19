const isBetween = (value, min, max) => value >= min && value <= max;

const isEligible = (answers) => {
  const relationship = answers['QUESTION 5'];
  return ((relationship.index === 0) || (relationship.index === 1 &&
      !['3-6 months', '>6 months'].includes(relationship[1]))) &&
    answers['QUESTION 2'].index !== 2 &&
    isBetween(Number(answers['QUESTION 3'][-1]), 21, 35) &&
    answers['QUESTION 4'].index === 0;
};

export const isSingle = state => state.answers['QUESTION 5'].index === 0;

export default isEligible;
