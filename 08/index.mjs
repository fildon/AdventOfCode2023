// @ts-check

import { getInputStrings } from "../utils.mjs";

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

const inputStrings = getInputStrings("./08/input-real.txt");

const { directions, graph } = parseInput(inputStrings);

const starts = Object.keys(graph).filter((key) => key.at(-1) === "A");

starts.forEach((start) => {
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

  console.log({
    // start,
    // loopStartNode: `${location}:${instructionPointer}`,
    loopStartIndex: visitedStates.indexOf(`${location}:${instructionPointer}`),
    loopLength:
      visitedStates.length -
      visitedStates.indexOf(`${location}:${instructionPointer}`),
    // terminators: visitedStates.filter((x) => x[2] === "Z").length,
  });
})
