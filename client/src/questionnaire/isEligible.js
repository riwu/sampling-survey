const isBetween = (value, min, max) => value >= min && value <= max;

const isEligible = answers =>
  true;
  // answers['QUESTION 2'].index !== 2 &&
  // answers['QUESTION 3'].index === 0 &&
  // answers['QUESTION 4'].index === 2 &&
  // isBetween(Number(answers['QUESTION 11'][-1]), 21, 35) &&
  // answers['QUESTION 16'].index === 1 && !['3-6 months', '>6 months'].includes(answers['QUESTION 16'][1]);

export default isEligible;
