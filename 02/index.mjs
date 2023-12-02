// @ts-check
/**
 * Given a string of the form "1 green, 3 red, 6 blue",
 * parse to an object representation of the same information.
 * e.g. `{ green: 1, red: 3, blue: 6 }`
 * @param {string} revealString
 */
const parseRevealString = (revealString) => ({
  // We prefill the object with zeroes so that missing values are zero
  // rather than undefined
  red: 0,
  green: 0,
  blue: 0,
  ...Object.fromEntries(
    revealString
      .split(", ")
      .map((numAndColor) => numAndColor.split(" "))
      .map(([number, colour]) => [colour, parseInt(number)])
  ),
});

/**
 * Given an input line, parse it to a Game object
 * @param {string} line
 */
const lineToGame = (line) => {
  const gameIdMatches = line.match(/Game (\d+):/);
  if (gameIdMatches === null) throw new Error("Parse error");
  const id = parseInt(gameIdMatches[1]);
  const colonIndex = line.indexOf(":");
  const reveals = line
    .slice(colonIndex + 2)
    .split("; ")
    .map(parseRevealString);
  return { id, reveals };
};

/**
 * Create a game filter. Which games are possible given the constraints provided?
 * @param {{ red: number, green: number, blue: number }} constraints
 * @returns { function({ reveals: { red: number, green: number, blue: number }[] }): boolean }
 */
const isPossibleWithConstraint =
  (constraints) =>
  ({ reveals }) =>
    reveals.every(
      ({ red, green, blue }) =>
        red <= constraints.red &&
        green <= constraints.green &&
        blue <= constraints.blue
    );

/**
 * @param {string[]} inputStrings
 */
export const solvePart1 = (inputStrings) =>
  inputStrings
    .map(lineToGame)
    .filter(isPossibleWithConstraint({ red: 12, green: 13, blue: 14 }))
    .map(({ id }) => id)
    .reduce((a, b) => a + b);

/**
 * > in each game you played, what is the fewest number of cubes of each color
 * > that could have been in the bag to make the game possible?
 * @param {{ reveals: { red: number, green: number, blue: number }[] }} game
 * @returns {{ red: number, green: number, blue: number }}
 */
const minimumSet = ({ reveals }) =>
  reveals.reduce((acc, { red, green, blue }) => ({
    red: Math.max(acc.red, red),
    green: Math.max(acc.green, green),
    blue: Math.max(acc.blue, blue),
  }));

/**
 * @param {string[]} inputStrings
 */
export const solvePart2 = (inputStrings) =>
  inputStrings
    .map(lineToGame)
    .map(minimumSet)
    .map(({ red, green, blue }) => red * green * blue)
    .reduce((a, b) => a + b);
