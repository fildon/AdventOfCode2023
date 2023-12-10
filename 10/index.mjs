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
const parseInput = (inputStrings) => {
  const pipeMap = inputStrings.map((inputString) => inputString.split(""));
  const height = inputStrings.length;
  const width = inputStrings[0].length;
  const getNeighbours = createGetNeighbours(pipeMap);
  const startY = inputStrings
    .map((inputString) => inputString.includes("S"))
    .indexOf(true);
  const startX = inputStrings[startY].indexOf("S");

  let pointers = Object.values(getNeighbours({ x: startX, y: startY }))
    .filter(
      ({ x, y }) =>
        // Coordinate must be within the grid
        x >= 0 && y >= 0 && x < width && y < height
    )
    .filter((candidate) =>
      // candidate must connect to the start
      getNeighbours(candidate).some(({ x, y }) => x === startX && y === startY)
    );

  if (pointers.length !== 2)
    throw new Error("Start point should have exactly two connections");

  const sNeighbours = pointers
    .map(({ x, y }) => {
      const xDiff = x - startX;
      const yDiff = y - startY;
      return xDiff === 1 ? "E" : yDiff === 1 ? "N" : xDiff === -1 ? "W" : "S";
    })
    .sort()
    .join("");

  let sReplacement = "";
  switch (sNeighbours) {
    case "EN":
      sReplacement = "L";
    case "ES":
      sReplacement = "F";
    case "EW":
      sReplacement = "-";
    case "NS":
      sReplacement = "|";
    case "NW":
      sReplacement = "J";
    case "SW":
      sReplacement = "7";
  }

  return {
    startX,
    startY,
    pipeMap: pipeMap.map((pipeRow) =>
      pipeRow.map((pipeCell) => (pipeCell === "S" ? sReplacement : pipeCell))
    ),
    getNeighbours,
    height,
    width,
  };
};

/**
 * @param {string[]} inputStrings
 */
const getLoopMembers = (inputStrings) => {
  const { startX, startY, getNeighbours } = parseInput(inputStrings);

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

  while (
    // While the pointers are not equal
    !(pointers[0].x === pointers[1].x && pointers[0].y === pointers[1].y)
  ) {
    pointers = pointers.map(
      (pointer) =>
        getNeighbours(pointer).filter(
          ({ x, y }) => !visited.has(`${x}:${y}`)
        )[0]
    );

    pointers.forEach(({ x, y }) => visited.add(`${x}:${y}`));
  }

  return visited;
};

/**
 * @param {string[]} inputStrings
 */
export const solvePart1 = (inputStrings) =>
  getLoopMembers(inputStrings).size / 2;

/**
 * @param {string[]} inputStrings
 */
export const solvePart2 = (inputStrings) => {
  const { pipeMap, height, width } = parseInput(inputStrings);
  const loop = getLoopMembers(inputStrings);

  /**
   * @type {{ x: number, y: number }[]}
   */
  const allCoords = Array.from({ length: height }).flatMap((_, y) =>
    Array.from({ length: width }).map((_, x) => ({ x, y }))
  );

  const nonLoop = allCoords.filter(({ x, y }) => !loop.has(`${x}:${y}`));

  const innerCells = nonLoop.filter(({ x, y }) => {
    let inside = false;
    let diff = 0;
    let parallelEntrance = undefined;
    while (x + diff + 1 < width) {
      diff++;
      // Ignore anything which isn't a loop cell
      if (!loop.has(`${x + diff}:${y}`)) continue;

      // Handle a loop cell according to its type
      const other = pipeMap[y][x + diff];
      switch (other) {
        case "|":
          // A clean intersection
          inside = !inside;
          continue;
        case "L":
          // We enter the state of running parallel to the pipe, no intersection yet.
          parallelEntrance = "L";
          continue;
        case "F":
          // We enter the state of running parallel to the pipe, no intersection yet.
          parallelEntrance = "F";
          continue;
        case "-":
          // We continue in parallel, but no intersection found yet
          continue;
        case "J":
          // We are leaving the parallel state.
          // If we entered via "F" then this is an intersection
          if (parallelEntrance === "F") inside = !inside;
          parallelEntrance = undefined;
          continue;
        case "7":
          // We are leaving the parallel state.
          // If we entered via "L" then this is an intersection
          if (parallelEntrance === "L") inside = !inside;
          parallelEntrance = undefined;
          continue;
        case ".":
          throw new Error(". should not be part of the loop!");
        case "S":
          throw new Error("S should have been removed from the pipe map");
      }
    }
    return inside;
  });

  return innerCells.length;
};
