// @ts-check
/**
 * @param {string} platformRow
 */
const slide = (platformRow) =>
  platformRow
    .split("#")
    .map((section) => section.split("").sort().reverse().join(""))
    .join("#");

/**
 * @param {string[]} platform
 */
const rotate = (platform) =>
  Array.from({ length: platform[0].length }).map((_, row) =>
    platform
      .map((x) => x[row])
      .reverse()
      .join("")
  );

/**
 * @param {string} row
 */
const score = (row) =>
  row
    .split("")
    .map((char, i) => (char === "O" ? row.length - i : 0))
    .reduce((a, b) => a + b);

/**
 * @param {string[]} inputStrings
 */
export const solvePart1 = (inputStrings) =>
  rotate(rotate(rotate(inputStrings)))
    .map(slide)
    .map(score)
    .reduce((a, b) => a + b);

/**
 * @param {string[]} platform
 */
const cycle = (platform) =>
  rotate(
    rotate(rotate(rotate(platform.map(slide)).map(slide)).map(slide)).map(slide)
  );

/**
 * @param {string[]} inputStrings
 */
export const solvePart2 = (inputStrings) => {
  // Point North edge to the left
  let platform = rotate(rotate(rotate(inputStrings)));

  // Loop until we find repetition in states
  let cyclesCompleted = 0;
  /**
   * @type {Array<string>}
   */
  const seen = [];
  while (!seen.includes(platform.join(""))) {
    seen.push(platform.join(""));
    platform = cycle(platform);
    cyclesCompleted++;
  }

  // Identified repeating state loop
  const firstRepetition = seen.indexOf(platform.join(""));
  const cycleLength = cyclesCompleted - firstRepetition;

  // Advance loop by cycle mod until we line up with the destination
  while (cyclesCompleted % cycleLength !== 1000000000 % cycleLength) {
    platform = cycle(platform);
    cyclesCompleted++;
  }

  return platform.map(score).reduce((a, b) => a + b);
};
