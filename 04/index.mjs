// @ts-check

/**
 * @param {string} inputLine
 */
const countMatchesOnCard = (inputLine) => {
  const [left, right] = inputLine.split("|");
  const winningSet = new Set(
    left
      .split(":")[1]
      .split(" ")
      .map((str) => parseInt(str))
      .filter(Boolean)
  );
  return right
    .split(" ")
    .map((x) => parseInt(x))
    .filter(Boolean)
    .filter((x) => winningSet.has(x)).length;
};

/**
 * @param {string} inputLine
 */
const scoreLine = (inputLine) => {
  const matches = countMatchesOnCard(inputLine);

  if (matches === 0) return 0;

  return 2 ** (matches - 1);
};

/**
 * @param {string[]} inputLines
 */
export const solvePart1 = (inputLines) =>
  inputLines.map(scoreLine).reduce((a, b) => a + b);

/**
 * @param {string[]} inputLines
 */
export const solvePart2 = (inputLines) => {
  const cardCounts = new Array(inputLines.length).fill(1);

  for (let i = 0; i < inputLines.length; i++) {
    const matches = countMatchesOnCard(inputLines[i]);
    for (let j = 1; j < matches + 1; j++) {
      cardCounts[i + j] += cardCounts[i];
    }
  }
  return cardCounts.reduce((a, b) => a + b);
};
