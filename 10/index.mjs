// @ts-check
const connectionsOf = {
  "|": [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ],
  "-": [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ],
  L: [
    { x: 1, y: 0 },
    { x: 0, y: -1 },
  ],
  J: [
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ],
  7: [
    { x: -1, y: 0 },
    { x: 0, y: 1 },
  ],
  F: [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ],
  ".": [],
  S: [
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
  ],
};

/**
 * @param {{x: number, y: number}} a
 * @returns {function({x: number, y: number}): {x: number, y: number}}
 */
const add = (a) => (b) => ({ x: a.x + b.x, y: a.y + b.y });

/**
 * @param {string[][]} pipeMap
 * @returns {function ({ x: number, y:number }): {x: number, y: number}[]} coordinate
 */
const createGetNeighbours =
  (pipeMap) =>
  ({ x, y }) =>
    connectionsOf[pipeMap[y][x]].map(add({ x, y }));

/**
 * @param {string[]} inputStrings
 */
export const solvePart1 = (inputStrings) => {
  const pipeMap = inputStrings.map((inputString) => inputString.split(""));
  const getNeighbours = createGetNeighbours(pipeMap);
  const startY = inputStrings
    .map((inputString) => inputString.includes("S"))
    .indexOf(true);
  const startX = inputStrings[startY].indexOf("S");

  const visited = new Set([`${startX}:${startY}`]);

  let pointers = Object.values(getNeighbours({ x: startX, y: startY }))
    .filter(
      ({ x, y }) =>
        // Coordinate must be within the grid
        x >= 0 &&
        y >= 0 &&
        x < inputStrings[0].length &&
        y < inputStrings.length
    )
    .filter((candidate) =>
      // candidate must connect to the start
      getNeighbours(candidate).some(({ x, y }) => x === startX && y === startY)
    );

  if (pointers.length !== 2)
    throw new Error("Start point should have exactly two connections");

  pointers.forEach(({ x, y }) => visited.add(`${x}:${y}`));

  /**
   * How many steps we have searched.
   * The start "S" is at zero, but these pointers start one step out.
   */
  let distance = 1;

  while (
    // While the pointers are not equal
    !(pointers[0].x === pointers[1].x && pointers[0].y === pointers[1].y)
  ) {
    distance++;

    pointers = pointers.map(
      (pointer) =>
        getNeighbours(pointer).filter(
          ({ x, y }) => !visited.has(`${x}:${y}`)
        )[0]
    );

    pointers.forEach(({ x, y }) => visited.add(`${x}:${y}`));
  }

  return distance;
};
