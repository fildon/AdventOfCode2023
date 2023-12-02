// @ts-check
/**
 * @param {string[]} inputLines
 */
export const solvePart1 = (inputLines) =>
  inputLines
    .filter((line) => line.length > 0)
    .map((line) =>
      line
        .split("")
        .map((char) => parseInt(char))
        .filter((char) => !isNaN(char))
    )
    .map((nums) => parseInt(`${nums[0]}${nums[nums.length - 1]}`))
    .reduce((a, b) => a + b);

const regex = /\d|one|two|three|four|five|six|seven|eight|nine/;

const getLastMatch = (line) => {
  let sliceSize = 1;
  while (true) {
    const matches = line.slice(line.length - sliceSize).match(regex);
    if (matches) return matches[0];
    sliceSize++;
  }
};

const numberMap = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
].reduce((acc, curr, i) => {
  acc[curr] = i + 1;
  return acc;
}, {});

const toNum = (value) => numberMap[value] ?? value;

/**
 * @param {string[]} inputLines
 */
export const solvePart2 = (inputLines) =>
  inputLines
    .filter((line) => line.length > 0)
    .map((line) => {
      const firstMatch = line.match(regex)?.[0];
      const lastMatch = getLastMatch(line);
      return parseInt(`${toNum(firstMatch)}${toNum(lastMatch)}}`);
    })
    .reduce((a, b) => a + b);
