// @ts-check
/**
 * @param {string} input
 */
const parseInput = (input) =>
  input.split(/\n\n/).map((valley) => valley.split(/\n/));

/**
 * @param {string[]} valley
 */
const transpose = (valley) =>
  Array.from({ length: valley[0].length }).map((_, row) =>
    valley.map((x) => x[row]).join("")
  );

/**
 * @param {string[]} valley
 */
const findReflectedColumnIndex = (valley) =>
  findReflectedRowIndex(transpose(valley));

/**
 * @param {string[]} valley
 */
const findReflectedRowIndex = (valley) => {
  for (let i = 1; i < valley.length; i++) {
    const r = 2 * i - 1;
    let isReflection = true;
    for (let j = 0; j < i; j++) {
      const rowA = valley[j];
      const rowB = valley[r - j];
      if (!!rowB && rowA !== rowB) {
        isReflection = false;
      }
    }
    if (isReflection) return i;
  }
  return null;
};

/**
 * @param {string[]} valley
 */
const getReflectionScore = (valley) => {
  const reflectedRowIndex = findReflectedRowIndex(valley);
  if (reflectedRowIndex) return 100 * reflectedRowIndex;
  return findReflectedColumnIndex(valley) ?? NaN;
};

/**
 * @param {string} inputString
 */
export const solvePart1 = (inputString) =>
  parseInput(inputString)
    .map(getReflectionScore)
    .reduce((a, b) => a + b);

/**
 * @param {string} a
 * @param {string} b
 */
const hammingDistance = (a, b) =>
  a.split("").filter((aChar, i) => aChar !== b[i]).length;

/**
 * @param {string[]} valley
 */
const findSmudgedMirrowRow = (valley) => {
  for (let i = 1; i < valley.length; i++) {
    const r = 2 * i - 1;
    let smudges = 0;
    for (let j = 0; j < i; j++) {
      const rowA = valley[j];
      const rowB = valley[r - j];
      if (!!rowB) {
        smudges += hammingDistance(rowA, rowB);
      }
    }
    if (smudges === 1) return i;
  }
  return null;
};

/**
 * @param {string[]} valley
 */
const findSmudgedMirrowCol = (valley) =>
  findSmudgedMirrowRow(transpose(valley));

/**
 * @param {string[]} valley
 */
const getSmudgedScore = (valley) => {
  const reflectedRowIndex = findSmudgedMirrowRow(valley);
  if (reflectedRowIndex) return 100 * reflectedRowIndex;
  return findSmudgedMirrowCol(valley) ?? NaN;
};

/**
 * @param {string} inputString
 */
export const solvePart2 = (inputString) =>
  parseInput(inputString)
    .map(getSmudgedScore)
    .reduce((a, b) => a + b);
