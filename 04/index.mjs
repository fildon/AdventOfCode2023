// @ts-check

/**
 * @param {string} inputLine
 */
const scoreLine = (inputLine) => {
  const [left, right] = inputLine.split("|");
  const winningSet = new Set(
    left
      .split(":")[1]
      .split(" ")
      .map((str) => parseInt(str))
      .filter(Boolean)
  );
  const matches = right
    .split(" ")
    .map((x) => parseInt(x))
    .filter(Boolean)
    .filter((x) => winningSet.has(x)).length;

  if (matches === 0) return 0;

  return (
    2 **
    (right
      .split(" ")
      .map((x) => parseInt(x))
      .filter(Boolean)
      .filter((x) => winningSet.has(x)).length -
      1)
  );
};

/**
 * @param {string[]} inputLines
 */
export const solvePart1 = (inputLines) =>
  inputLines.map(scoreLine).reduce((a, b) => a + b);
