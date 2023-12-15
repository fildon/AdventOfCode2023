// @ts-check
/**
 * @param {string} input
 */
const hash = (input) =>
  Array.from({ length: input.length })
    .map((_, i) => input.charCodeAt(i))
    .reduce((acc, curr) => ((acc + curr) * 17) % 256, 0);

/**
 * @param {string} inputString
 */
export const solvePart1 = (inputString) =>
  inputString
    .split(",")
    .map(hash)
    .reduce((a, b) => a + b);
