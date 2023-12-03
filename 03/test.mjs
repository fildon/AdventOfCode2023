// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInputStrings } from "../utils.mjs";

import { solvePart1 } from "./index.mjs";

describe("Day 03", () => {
  describe("Part 01", () => {
    test("test input", () => {
      strictEqual(solvePart1(getInputStrings("./03/input-test.txt")), 4361);
    });
    test("real input", () => {
      strictEqual(solvePart1(getInputStrings("./03/input-real.txt")), 560670);
    });
  });
});
