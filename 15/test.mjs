// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { getInput } from "../utils.mjs";

import { solvePart1 } from "./index.mjs";

describe("Day 15", () => {
  describe("Part 01", () => {
    test("test input", () => {
      strictEqual(
        solvePart1("rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"),
        1320
      );
    });
    test("real input", () => {
      strictEqual(solvePart1(getInput("./15/input-real.txt")), 517965);
    });
  });
});
