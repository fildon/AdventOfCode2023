// @ts-check
/**
 * @param {{ x: number, y: number, dir: ('E'|'N'|'W'|'S') }} beam
 */
const advance = ({ x, y, dir }) => {
  switch (dir) {
    case "E":
      return { x: x + 1, y, dir };
    case "N":
      return { x, y: y - 1, dir };
    case "W":
      return { x: x - 1, y, dir };
    case "S":
      return { x, y: y + 1, dir };
  }
};

/**
 * @type {Record<('E'|'N'|'W'|'S'),('E'|'N'|'W'|'S')>}
 */
const forwardSlashMap = {
  E: "N",
  N: "E",
  W: "S",
  S: "W",
};

/**
 * @type {Record<('E'|'N'|'W'|'S'),('E'|'N'|'W'|'S')>}
 */
const backSlashMap = {
  E: "S",
  N: "W",
  W: "N",
  S: "E",
};

/**
 * @param {string[]} floorMap
 * @param {{ x: number, y: number, dir: ('E'|'N'|'W'|'S') }} startingBeam
 */
const countLava = (floorMap, startingBeam) => {
  const height = floorMap.length;
  const width = floorMap[0].length;

  /**
   * Set of visited states of the form `${x},${y};${dir}
   * @type {Set<string>}
   */
  const visitedBeamStates = new Set([]);

  let beams = [startingBeam];
  while (beams.length > 0) {
    beams = beams.flatMap((beam) => {
      // This beam has exited the map. No further processing required.
      if (beam.x < 0 || beam.x >= width || beam.y < 0 || beam.y >= height)
        return [];
      // We have already processed this beam state.
      // We drop this beam to avoid an infinite loop.
      if (visitedBeamStates.has(`${beam.x},${beam.y};${beam.dir}`)) return [];

      visitedBeamStates.add(`${beam.x},${beam.y};${beam.dir}`);
      const cell = floorMap[beam.y][beam.x];
      if (cell === "/") {
        beam.dir = forwardSlashMap[beam.dir];
      } else if (cell === "\\") {
        beam.dir = backSlashMap[beam.dir];
      } else if (cell === "|" && ["E", "W"].includes(beam.dir)) {
        return [advance({ ...beam, dir: "N" }), advance({ ...beam, dir: "S" })];
      } else if (cell === "-" && ["N", "S"].includes(beam.dir)) {
        return [advance({ ...beam, dir: "E" }), advance({ ...beam, dir: "W" })];
      }
      return advance(beam);
    });
  }

  // Collapse state set to just the unique cells
  // So that we avoid double counting cells visited from multiple directions
  return new Set([...visitedBeamStates.values()].map((x) => x.split(";")[0]))
    .size;
};

/**
 * @param {string[]} inputStrings
 */
export const solvePart1 = (inputStrings) =>
  countLava(inputStrings, { x: 0, y: 0, dir: "E" });

/**
 * @param {number} height
 * @param {number} width
 * @return {Array<{ x: number, y: number, dir: ('E'|'N'|'W'|'S') }>}
 */
// @ts-ignore
const createAllStartingBeams = (height, width) => [
  ...Array.from({ length: height }).flatMap((_, y) => [
    { x: 0, y, dir: "E" },
    { x: width - 1, y, dir: "W" },
  ]),
  ...Array.from({ length: width }).flatMap((_, x) => [
    {
      x,
      y: 0,
      dir: "S",
    },
    {
      x,
      y: height - 1,
      dir: "N",
    },
  ]),
];

/**
 * @param {string []} inputStrings
 */
export const solvePart2 = (inputStrings) =>
  createAllStartingBeams(inputStrings.length, inputStrings[0].length)
    .map((startingBeam) => countLava(inputStrings, startingBeam))
    .reduce((a, b) => Math.max(a, b));
