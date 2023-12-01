import { readFileSync } from "fs";

/**
 *
 * @param {string} filePath
 * @returns {string}
 */
export const getInput = (filePath) =>
  readFileSync(filePath, { encoding: "utf-8" }).replace(/(\r\n)|\r|\n/g, "\n");

/**
 *
 * @param {string} filePath
 * @returns {string[]}
 */
export const getInputStrings = (filePath) => getInput(filePath).split(/\n/g);
