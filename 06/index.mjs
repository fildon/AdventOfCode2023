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

  // Using the quadratic formula:
  const a = -1;
  const b = time;
  const c = -distance;
  const lowerRoot = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
  const upperRoot = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
  const lowestValidInt =
    lowerRoot === Math.ceil(lowerRoot) ? lowerRoot + 1 : Math.ceil(lowerRoot);
  const highestValidInt =
    upperRoot === Math.floor(upperRoot) ? upperRoot - 1 : Math.floor(upperRoot);
  return highestValidInt - lowestValidInt + 1;
};

/**
 * @param {string[]} inputLines
 */
export const solvePart1 = (inputLines) => {
  const races = parseInputLines(inputLines);
  const waysToWin = races.map(countWaysToWin);
  return waysToWin.reduce((a, b) => a * b);
};

/**
 * @param {string[]} inputLines
 */
export const solvePart2 = (inputLines) => {
  const time = parseInt(
    inputLines[0]
      .split("")
      .filter((char) => /\d/.exec(char))
      .join("")
  );
  const distance = parseInt(
    inputLines[1]
      .split("")
      .filter((char) => /\d/.exec(char))
      .join("")
  );
  return countWaysToWin({ time, distance });
};
