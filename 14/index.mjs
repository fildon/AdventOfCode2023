// @ts-check
/**
 * @param {string[]} platform
 */
const transpose = (platform) =>
  Array.from({ length: platform[0].length }).map((_, row) =>
    platform.map((x) => x[row]).join("")
  );

/**
 * @param {string} platformRow
 */
const slideRocks = (platformRow) =>
  platformRow
    .split("#")
    .map((section) => section.split("").sort().reverse().join(""))
    .join("#");

/**
 * @param {string} row
 */
const scoreRow = (row) =>
  row
    .split("")
    .map((char, i) => (char === "O" ? row.length - i : 0))
    .reduce((a, b) => a + b);

/**
 * @param {string[]} inputStrings
 */
export const solvePart1 = (inputStrings) =>
  transpose(inputStrings)
    .map(slideRocks)
    .map(scoreRow)
    .reduce((a, b) => a + b);
