// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInputStrings } from "../utils.mjs";

import { solvePart1, solvePart2 } from "./index.mjs";

describe("Day 08", () => {
  describe("Part 01", () => {
    test("test input", () => {
      strictEqual(solvePart1(getInputStrings("./08/input-test1.txt")), 2);
    });
    test("real input", () => {
      strictEqual(solvePart1(getInputStrings("./08/input-real.txt")), 20513);
    });
  });
  describe("Part 02", () => {
    test("test input", () => {
      strictEqual(solvePart2(getInputStrings("./08/input-test2.txt")), 6);
    });
    test("real input", () => {
      strictEqual(
        solvePart2(getInputStrings("./08/input-real.txt")),
        15995167053923
      );
    });
  });
});
