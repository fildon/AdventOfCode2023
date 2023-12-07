// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInputStrings } from "../utils.mjs";

import { solvePart1, solvePart2 } from "./index.mjs";

describe("Day 07", () => {
  describe("Part 01", () => {
    test("test input", () => {
      strictEqual(solvePart1(getInputStrings("./07/input-test.txt")), 6440);
    });
    test("real input", () => {
      strictEqual(solvePart1(getInputStrings("./07/input-real.txt")), 255048101);
    });
  });
  describe("Part 02", () => {
    test("test input", () => {
      strictEqual(solvePart2(getInputStrings("./07/input-test.txt")), 5905);
    });
    test("real input", () => {
      strictEqual(solvePart2(getInputStrings("./07/input-real.txt")), 253718286);
    });
  });
});
