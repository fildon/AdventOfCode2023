// @ts-check
/**
 * @param {string} conditionRecord
 * @param {number[]} contiguousGroups
 */
const countArrangements = (conditionRecord, contiguousGroups) => {
  if (contiguousGroups.length === 0)
    // If there are any unmatched # then we reject this branch
    return conditionRecord.includes("#") ? 0 : 1;

  // Skip leading `.`s
  if (conditionRecord[0] === ".")
    return countArrangements(conditionRecord.slice(1), contiguousGroups);

  const [headGroup, ...tailGroups] = contiguousGroups;
  // If this headGroup won't fit, we reject this branch
  if (headGroup > conditionRecord.length) return 0;

  const match =
    conditionRecord
      .slice(0, headGroup)
      .split("")
      .every((char) => char === "#" || char === "?") &&
    // The character after must not be a #
    conditionRecord[headGroup] !== "#";

  // We only scan on siblings if the first character is not a `#`
  const siblingCount =
    conditionRecord[0] === "#"
      ? 0
      : countArrangements(conditionRecord.slice(1), contiguousGroups);

  // If a match is not found, then we don't have descendents
  const descendentCount = match
    ? countArrangements(conditionRecord.slice(headGroup + 1), tailGroups)
    : 0;

  return siblingCount + descendentCount;
};

/**
 * @param {string[]} inputStrings
 */
export const solvePart1 = (inputStrings) =>
  inputStrings
    .map((inputString) => {
      const [conditionRecord, contiguousGroups] = inputString.split(" ");
      return {
        conditionRecord,
        contiguousGroups: contiguousGroups
          .split(",")
          .map((digit) => parseInt(digit)),
      };
    })
    .map(({ conditionRecord, contiguousGroups }) =>
      countArrangements(conditionRecord, contiguousGroups)
    )
    .reduce((a, b) => a + b);

