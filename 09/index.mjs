// @ts-check
/**
 * @param {number[]} sequence
 */
const createDiffSequence = (sequence) =>
  new Array(sequence.length - 1)
    .fill(0)
    .map((_, i) => sequence[i + 1] - sequence[i]);

/**
 * @param {number[]} sequence
 */
const nextValueOfSequence = (sequence) => {
  // If all members are equal, return the equal value immediately
  if (new Set(sequence).size === 1) return sequence[0];
  // Else recurse
  return (
    sequence[sequence.length - 1] +
    nextValueOfSequence(createDiffSequence(sequence))
  );
};

/**
 * @param {number[]} sequence
 */
const priorValueOfSequence = (sequence) => {
  // If all members are equal, return the equal value immediately
  if (new Set(sequence).size === 1) return sequence[0];
  // Else recurse
  return sequence[0] - priorValueOfSequence(createDiffSequence(sequence));
};

/**
 * @param {string[]} inputStrings
 */
export const solvePart1 = (inputStrings) =>
  inputStrings
    .map((inputString) =>
      inputString.split(" ").map((digits) => parseInt(digits))
    )
    .map(nextValueOfSequence)
    .reduce((a, b) => a + b);

/**
 * @param {string[]} inputStrings
 */
export const solvePart2 = (inputStrings) => 
  inputStrings
    .map((inputString) =>
      inputString.split(" ").map((digits) => parseInt(digits))
    )
    .map(priorValueOfSequence)
    .reduce((a, b) => a + b);
