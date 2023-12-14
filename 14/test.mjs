// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInputStrings } from "../utils.mjs";

import { solvePart1, solvePart2 } from "./index.mjs";

describe("Day 14", () => {
  describe("Part 01", () => {
    test("test input", () => {
      strictEqual(solvePart1(getInputStrings("./14/input-test.txt")), 136);
    });
    test("real input", () => {
      strictEqual(solvePart1(getInputStrings("./14/input-real.txt")), 108935);
    });
  });
  describe("Part 02", () => {
    test("test input", () => {
      strictEqual(solvePart2(getInputStrings("./14/input-test.txt")), 64);
    });
    test("real input", () => {
      strictEqual(solvePart2(getInputStrings("./14/input-real.txt")), 100876);
    });
  });
});
