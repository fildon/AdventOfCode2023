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

/**
 * @param {Array<{label: string, focalLength: number}>} box
 * @param {number} boxIndex
 */
const scoreBox = (box, boxIndex) =>
  box
    .map(
      ({ focalLength }, lensIndex) =>
        (boxIndex + 1) * (lensIndex + 1) * focalLength
    )
    .reduce((a, b) => a + b, 0);

/**
 * @param {string} inputString
 */
export const solvePart2 = (inputString) => {
  const instructions = inputString.split(",");

  /**
   * @type Array<Array<{ label: string, focalLength: number}>>}
   */
  const boxes = Array.from({ length: 256 }).map(() => []);

  return instructions
    .reduce((acc, instruction) => {
      // @ts-ignore
      const label = instruction.match(/[a-z]+/)[0];
      const box = hash(label);

      if (instruction.includes("=")) {
        const focalLength = parseInt(instruction.slice(-1));

        // Search for existing label in this box
        for (let i = 0; i < acc[box].length; i++) {
          if (acc[box][i].label === label) {
            // If found, update the focal length, and skip to next instruction
            acc[box][i].focalLength = focalLength;
            return acc;
          }
        }

        // No matching label was found, so push a new lens into the box
        acc[box].push({ label, focalLength });
      } else {
        // remove lens
        acc[box] = acc[box].filter((lens) => lens.label !== label);
      }

      return acc;
    }, boxes)
    .map(scoreBox)
    .reduce((a, b) => a + b);
};
