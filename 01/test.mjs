// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInputStrings } from "../utils.mjs";

import { solvePart1, solvePart2 } from "./index.mjs";

describe("Day 01", () => {
  describe("Part 01", () => {
    test("test input", () =>
      strictEqual(solvePart1(getInputStrings("./01/input-test1.txt")), 142));
    test("real input", () =>
      strictEqual(solvePart1(getInputStrings("./01/input-real.txt")), 54573));
  });
  describe("Part 02", () => {
    test("test input", () =>
      strictEqual(solvePart2(getInputStrings("./01/input-test2.txt")), 281));
    test("real input", () =>
      strictEqual(solvePart2(getInputStrings("./01/input-real.txt")), 54591));
  });
});
