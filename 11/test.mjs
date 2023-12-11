// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInputStrings } from "../utils.mjs";

import { solvePart1, solvePart2 } from "./index.mjs";

describe("Day 11", () => {
  describe("Part 01", () => {
    test("real input", () => {
      strictEqual(solvePart1(getInputStrings("./11/input-real.txt")), 9974721);
    });
  });
  describe("Part 02", () => {
    test("real input", () => {
      strictEqual(
        solvePart2(getInputStrings("./11/input-real.txt")),
        702770569197
      );
    });
  });
});
