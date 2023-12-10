// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInputStrings } from "../utils.mjs";

import { solvePart1, solvePart2 } from "./index.mjs";

describe("Day 10", () => {
  describe("Part 01", () => {
    test("test input", () => {
      strictEqual(solvePart1(getInputStrings("./10/input-test.txt")), 8);
    });
    test("real input", () => {
      strictEqual(solvePart1(getInputStrings("./10/input-real.txt")), 6956);
    });
  });
  describe("Part 02", () => {
    test("test input", () => {
      strictEqual(solvePart2(getInputStrings("./10/input-test.txt")), 1);
    });
    test("real input", () => {
      strictEqual(solvePart2(getInputStrings("./10/input-real.txt")), 455);
    });
  });
});
