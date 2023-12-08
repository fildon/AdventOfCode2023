// @ts-check

export const solvePart1 = (inputStrings) => {
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
