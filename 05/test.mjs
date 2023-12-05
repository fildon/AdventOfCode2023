// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInput } from "../utils.mjs";

import { solvePart1 } from "./index.mjs";

describe("Day 05", () => {
  describe("Part 01", () => {
    test("test input", () => {
      strictEqual(solvePart1(getInput("./05/input-test.txt")), 35);
    });
    test("real input", () => {
      strictEqual(solvePart1(getInput("./05/input-real.txt")), 175622908);
    });
  });
});
