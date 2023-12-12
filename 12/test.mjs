// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInputStrings } from "../utils.mjs";

import { solvePart1, solvePart2 } from "./index.mjs";

describe("Day 12", () => {
  describe("Part 01", () => {
    test("test input", () => {
      strictEqual(solvePart1(getInputStrings("./12/input-test.txt")), 21);
    });
    test("real input", () => {
      strictEqual(solvePart1(getInputStrings("./12/input-real.txt")), 6935);
    });
  });
  describe("Part 02", () => {
    test("test input", () => {
      strictEqual(solvePart2(getInputStrings("./12/input-test.txt")), 525152);
    });
    test("real input", () => {
      strictEqual(
        solvePart2(getInputStrings("./12/input-real.txt")),
        3920437278260
      );
    });
  });
});
