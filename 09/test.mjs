// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInputStrings } from "../utils.mjs";

import { solvePart1, solvePart2 } from "./index.mjs";

describe("Day 09", () => {
  describe("Part 01", () => {
    test("test input", () => {
      strictEqual(solvePart1(getInputStrings("./09/input-test.txt")), 114);
    });
    test("real input", () => {
      strictEqual(solvePart1(getInputStrings("./09/input-real.txt")), 1772145754);
    });
  });
  describe("Part 02", () => {
    test("test input", () => {
      strictEqual(solvePart2(getInputStrings("./09/input-test.txt")), 2);
    });
    test("real input", () => {
      strictEqual(solvePart2(getInputStrings("./09/input-real.txt")), 867);
    });
  });
});
