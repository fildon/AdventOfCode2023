// @ts-check
/**
 * @param {string[]} inputLines
 */
const parseInputLines = (inputLines) => {
  const [times, distances] = inputLines
    .map((inputLine) => [...(inputLine.match(/\d+/g) ?? [])])
    .map((digits) => digits.map((digit) => parseInt(digit)));
  // We assume the two arrays are the same length here
  return times.map((time, index) => ({ time, distance: distances[index] }));
};

/**
 * @param {{ time: number, distance: number }} race
 */
const countWaysToWin = ({ time, distance }) => {
  // The speed you achieve is equal to how long you hold the button
  // speed = buttonTime
  // The distance you travel is your speed times the non-button remaining time
  // distanceTravelled = speed * (time - buttonTime)

  // Generalize by combining the above equations to produce a quadratic
  // distanceTravelled = (-1) * (buttonTime ** 2) + (time) * (buttonTime) + 0

  // This then is the quadratic of how far past the distance goal we get for a given buttonTime
  // distancePastGoal = (-1) * (buttonTime ** 2) + (time) * (buttonTime) - distance

  // Fundamentally we want to count how many integer values of buttonTime yield
  // a positive value for the above equation

  // generate integers from 1 to time - 1 (inclusive)
  const validButtonTimes = new Array(time - 1).fill(0).map((_, i) => i + 1);

  return validButtonTimes.filter(
    (buttonTime) => -1 * buttonTime ** 2 + time * buttonTime - distance > 0
  ).length;
};

/**
 * @param {string[]} inputLines
 */
export const solvePart1 = (inputLines) => {
  const races = parseInputLines(inputLines);
  const waysToWin = races.map(countWaysToWin);
  return waysToWin.reduce((a, b) => a * b);
};
