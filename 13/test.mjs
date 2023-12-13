// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInput } from "../utils.mjs";

import { solvePart1, solvePart2 } from "./index.mjs";

describe("Day 13", () => {
  describe("Part 01", () => {
    test("test input", () => {
      strictEqual(solvePart1(getInput("./13/input-test.txt")), 405);
    });
    test("real input", () => {
      strictEqual(solvePart1(getInput("./13/input-real.txt")), 36041);
    });
  });
  describe("Part 02", () => {
    test("test input", () => {
      strictEqual(solvePart2(getInput("./13/input-test.txt")), 400);
    });
    test("real input", () => {
      strictEqual(solvePart2(getInput("./13/input-real.txt")), 35915);
    });
  });
});
