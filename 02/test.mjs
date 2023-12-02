// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInputStrings } from "../utils.mjs";

import { solvePart1, solvePart2 } from "./index.mjs";

describe("Day 02", () => {
  describe("Part 01", () => {
    test("test input", () => {
      strictEqual(solvePart1(getInputStrings("./02/input-test.txt")), 8);
    });
    test("real input", () => {
      strictEqual(solvePart1(getInputStrings("./02/input-real.txt")), 2416);
    });
  });
  describe("Part 02", () => {
    test("test input", () => {
      strictEqual(solvePart2(getInputStrings("./02/input-test.txt")), 2286);
    });
    test("real input", () => {
      strictEqual(solvePart2(getInputStrings("./02/input-real.txt")), 63307);
    });
  });
});
