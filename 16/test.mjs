// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInputStrings } from "../utils.mjs";

import { solvePart1 } from "./index.mjs";

describe("Day 16", () => {
  describe("Part 01", () => {
    test("test input", () => {
      strictEqual(solvePart1(getInputStrings("./16/input-test.txt")), 46);
    });
    test("real input", () => {
      strictEqual(solvePart1(getInputStrings("./16/input-real.txt")), 7185);
    });
  });
});
