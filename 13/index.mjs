// @ts-check
/**
 * @param {string} input
 */
const parseInput = (input) =>
  input.split(/\n\n/).map((valley) => valley.split(/\n/));

/**
 * @param {string} a
 * @param {string} b
 */
const hammingDistance = (a, b) =>
  a.split("").filter((aChar, i) => aChar !== b[i]).length;

/**
 * @param {string[]} valley
 * @param {number} smudges
 */
const findReflectedRowIndex = (valley, smudges) => {
  for (let i = 1; i < valley.length; i++) {
    const r = 2 * i - 1;
    let smudgeCounter = 0;
    for (let j = 0; j < i; j++) {
      const rowA = valley[j];
      const rowB = valley[r - j];
      if (!!rowB) {
        smudgeCounter += hammingDistance(rowA, rowB);
      }
    }
    if (smudgeCounter === smudges) return i;
  }
  return null;
};

/**
 * @param {string[]} valley
 */
const transpose = (valley) =>
  Array.from({ length: valley[0].length }).map((_, row) =>
    valley.map((x) => x[row]).join("")
  );

/**
 * @param {string[]} valley
 * @param {number} smudges
 */
const findReflectedColumnIndex = (valley, smudges) =>
  findReflectedRowIndex(transpose(valley), smudges);

/**
 * @param {number} smudges
 * @returns {function(string[]): number}
 */
const getReflectionScoreWithSmudgesCount = (smudges) => (valley) => {
  const reflectedRowIndex = findReflectedRowIndex(valley, smudges);
  if (reflectedRowIndex) return 100 * reflectedRowIndex;
  const reflectedColIndex = findReflectedColumnIndex(valley, smudges);
  if (reflectedColIndex) return reflectedColIndex;
  throw new Error("No reflection index found");
};

/**
 * @param {string} inputString
 */
export const solvePart1 = (inputString) =>
  parseInput(inputString)
    .map(getReflectionScoreWithSmudgesCount(0))
    .reduce((a, b) => a + b);

/**
 * @param {string} inputString
 */
export const solvePart2 = (inputString) =>
  parseInput(inputString)
    .map(getReflectionScoreWithSmudgesCount(1))
    .reduce((a, b) => a + b);
