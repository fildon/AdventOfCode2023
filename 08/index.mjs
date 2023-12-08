// @ts-check

/**
 * @param {string[]} inputStrings
 * @returns {{ directions: string, graph: Object.<string, { L: string, R: string }> }}}
 */
const parseInput = (inputStrings) => {
  const directions = inputStrings[0];

  const nodes = inputStrings.slice(2).map((nodeLine) => ({
    node: nodeLine.slice(0, 3),
    L: nodeLine.slice(7, 10),
    R: nodeLine.slice(12, 15),
  }));

  const graph = nodes.reduce((acc, { node, L, R }) => {
    acc[node] = { L, R };
    return acc;
  }, {});

  return { directions, graph };
};

export const solvePart1 = (inputStrings) => {
  const { directions, graph } = parseInput(inputStrings);

  let location = "AAA";
  let steps = 0;
  let instructionPointer = 0;

  while (location !== "ZZZ") {
    const direction = directions[instructionPointer];
    location = graph[location][direction];
    steps++;
    instructionPointer = (instructionPointer + 1) % directions.length;
  }
  return steps;
};

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

/**
 * @param {number} a
 * @param {number} b
 */
const lcm = (a, b) => (a * b) / gcd(a, b);

/**
 * @param {string[]} inputStrings
 */
export const solvePart2 = (inputStrings) => {
  const { directions, graph } = parseInput(inputStrings);

  const starts = Object.keys(graph).filter((key) => key.at(-1) === "A");

  return starts
    .map((start) => {
      let steps = 0;
      let instructionPointer = 0;
      let location = start;

      /**
       * @type {string[]}
       */
      const visitedStates = [];

      while (!visitedStates.includes(`${location}:${instructionPointer}`)) {
        visitedStates.push(`${location}:${instructionPointer}`);

        const direction = directions[instructionPointer];
        location = graph[location][direction];
        steps++;
        instructionPointer = (instructionPointer + 1) % directions.length;
      }

      return (
        visitedStates.length -
        visitedStates.indexOf(`${location}:${instructionPointer}`)
      );
    })
    .reduce((acc, loop) => lcm(acc, loop));
};
