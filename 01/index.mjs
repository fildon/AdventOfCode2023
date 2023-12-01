import { equal } from "node:assert";

import { getInputStrings } from "../utils.mjs";

const solvePart1 = (filePath) =>
  getInputStrings(filePath)
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

const solvePart2 = (filePath) =>
  getInputStrings(filePath)
    .filter((line) => line.length > 0)
    .map((line) => {
      const firstMatch = line.match(regex)[0];
      const lastMatch = getLastMatch(line);
      return parseInt(`${toNum(firstMatch)}${toNum(lastMatch)}}`);
    })
    .reduce((a, b) => a + b);

equal(solvePart1("./01/input-test1.txt"), 142);
equal(solvePart1("./01/input-real.txt"), 54573);
equal(solvePart2("./01/input-test2.txt"), 281);
equal(solvePart2("./01/input-real.txt"), 54591);
console.log("✔️");
