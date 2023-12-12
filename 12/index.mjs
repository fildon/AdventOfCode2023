// @ts-check
const prepareMemo = () => {
  const memory = new Map();
  /**
   * @type {function (string, number[]): number}
   */
  const memoizedCounter = (conditionRecord, contiguousGroups) => {
    const answerKey = `${conditionRecord}${contiguousGroups}`;
    if (!memory.has(answerKey)) {
      if (contiguousGroups.length === 0)
        // If there are any unmatched # then we reject this branch
        return conditionRecord.includes("#") ? 0 : 1;

      // Skip leading `.`s
      if (conditionRecord[0] === ".")
        return memoizedCounter(conditionRecord.slice(1), contiguousGroups);

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
          : memoizedCounter(conditionRecord.slice(1), contiguousGroups);

      // If a match is not found, then we don't have descendents
      const descendentCount = match
        ? memoizedCounter(conditionRecord.slice(headGroup + 1), tailGroups)
        : 0;

      memory.set(answerKey, siblingCount + descendentCount);
    }
    return memory.get(answerKey);
  };
  return memoizedCounter;
};

/**
 * @param {string} inputString
 */
const parseInputString = (inputString) => {
  const [conditionRecord, contiguousGroups] = inputString.split(" ");
  return {
    conditionRecord,
    contiguousGroups: contiguousGroups
      .split(",")
      .map((digit) => parseInt(digit)),
  };
};

/**
 * @param {string[]} inputStrings
 */
export const solvePart1 = (inputStrings) => {
  const memoizedArrangementCounter = prepareMemo();
  return inputStrings
    .map(parseInputString)
    .map(({ conditionRecord, contiguousGroups }) =>
      memoizedArrangementCounter(conditionRecord, contiguousGroups)
    )
    .reduce((a, b) => a + b);
};

/**
 * @param {{ conditionRecord: string, contiguousGroups: number[] }} args
 */
const unfold = ({ conditionRecord, contiguousGroups }) => {
  return {
    conditionRecord: Array.from({ length: 5 })
      .map(() => conditionRecord)
      .join("?"),
    contiguousGroups: Array.from({ length: 5 }).flatMap(() => contiguousGroups),
  };
};

/**
 * @param {string[]} inputStrings
 */
export const solvePart2 = (inputStrings) => {
  const memoizedArrangementCounter = prepareMemo();
  return inputStrings
    .map(parseInputString)
    .map(unfold)
    .map(({ conditionRecord, contiguousGroups }) =>
      memoizedArrangementCounter(conditionRecord, contiguousGroups)
    )
    .reduce((a, b) => a + b);
};
