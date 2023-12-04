// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInputStrings } from "../utils.mjs";

import { solvePart1, solvePart2 } from "./index.mjs";

describe("Day 04", () => {
  describe("Part 01", () => {
    test("test input", () => {
      strictEqual(solvePart1(getInputStrings("./04/input-test.txt")), 13);
    });
    test("real input", () => {
      strictEqual(solvePart1(getInputStrings("./04/input-real.txt")), 32001);
    });
  });
  describe("Part 02", () => {
    test("test input", () => {
      strictEqual(solvePart2(getInputStrings("./04/input-test.txt")), 30);
    });
    test("real input", () => {
      strictEqual(solvePart2(getInputStrings("./04/input-real.txt")), 5037841);
    });
  });
});
