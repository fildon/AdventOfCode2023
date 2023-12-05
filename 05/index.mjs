// @ts-check
/**
 * @param {string} input
 */
const parseInput = (input) => {
  const [[seedLine], ...mappingGroups] = input
    .split("\n\n")
    .map((mappingGroup) => mappingGroup.split(":")[1].trim())
    .map((mappingGroup) => mappingGroup.split(`\n`));

  const seeds = seedLine.split(" ").map((x) => parseInt(x));
  const resourceMaps = mappingGroups.map((mappingGroup) =>
    mappingGroup.map((mappingGroup) =>
      mappingGroup.split(" ").map((x) => parseInt(x))
    )
  );
  return {
    seeds,
    resourceMaps,
  };
};

/**
 * @param {string} input
 */
export const solvePart1 = (input) => {
  const { seeds, resourceMaps } = parseInput(input);

  const locations = resourceMaps.reduce(
    (resources, resourceMap) =>
      resources.map((resource) => {
        const matchingRule = resourceMap.find(
          ([, sourceRangeStart, rangeLength]) =>
            resource >= sourceRangeStart &&
            resource < sourceRangeStart + rangeLength
        );
        if (!matchingRule) return resource;
        const [destinationRangeStart, sourceRangeStart] = matchingRule;
        return destinationRangeStart + (resource - sourceRangeStart);
      }),
    seeds
  );

  const leastLocation = locations.reduce((a, b) => Math.min(a, b));

  return leastLocation;
};

/**
 * @param {number[]} seedValues
 * @returns {number[][]}
 */
const parseSeedRanges = (seedValues) => {
  // recursive empty base case
  if (seedValues.length <= 0) return [];
  // pop two values, process, and recurse on remainder
  const [rangeStart, rangeLength, ...rest] = seedValues;
  return [[rangeStart, rangeStart + rangeLength - 1], ...parseSeedRanges(rest)];
};

/**
 * Given a resource range and a resource map, return the mapped ranges.
 * @param {number[]} resourceRange
 * @param {number[][]} resourceMap
 * @returns {number[][]}
 */
const applyResourceMapToResourceRange = (resourceRange, resourceMap) => {
  // We'll use recursion on the resourceMap. Here are the base cases.
  // Input range is empty
  if (resourceRange[0] > resourceRange[1]) return [];
  // No resourceMap entries left to apply
  if (resourceMap.length <= 0) return [resourceRange];

  // Process exactly one resource map and recurse on the remainder.
  const [resourceMapEntry, ...otherResourceMapEntries] = resourceMap;

  const [destinationRangeStart, sourceRangeStart, rangeLength] =
    resourceMapEntry;
  const sourceRange = [sourceRangeStart, sourceRangeStart + rangeLength - 1];

  // There's no intersection if the resource range is fully above or fully below the source range
  const noIntersection =
    resourceRange[0] > sourceRange[1] || resourceRange[1] < sourceRange[0];
  if (noIntersection)
    return applyResourceMapToResourceRange(
      resourceRange,
      otherResourceMapEntries
    );

  const intersection = [
    Math.max(sourceRange[0], resourceRange[0]),
    Math.min(sourceRange[1], resourceRange[1]),
  ];
  const mappedIntersection = intersection.map(
    (x) => x + (destinationRangeStart - sourceRangeStart)
  );

  const resultsAbove = applyResourceMapToResourceRange(
    [sourceRange[1] + 1, resourceRange[1]],
    otherResourceMapEntries
  );
  const resultsBelow = applyResourceMapToResourceRange(
    [resourceRange[0], sourceRange[0] - 1],
    otherResourceMapEntries
  );

  return [mappedIntersection, ...resultsAbove, ...resultsBelow];
};

/**
 * @param {string} input
 */
export const solvePart2 = (input) => {
  const { seeds, resourceMaps } = parseInput(input);
  const seedRanges = parseSeedRanges(seeds);
  const locationRanges = resourceMaps.reduce(
    (resourceRanges, resourceMap) =>
      resourceRanges.flatMap((resourceRange) =>
        applyResourceMapToResourceRange(resourceRange, resourceMap)
      ),
    seedRanges
  );

  return locationRanges
    .map(([rangeStart]) => rangeStart)
    .reduce((a, b) => Math.min(a, b));
};
