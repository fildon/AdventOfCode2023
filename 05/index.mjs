// @ts-check
import { getInput } from "../utils.mjs";

const [[seedLine], ...mappingGroups] = getInput("./05/input-real.txt")
  .split("\n\n")
  .map((mappingGroup) => mappingGroup.split(":")[1].trim())
  .map((mappingGroup) => mappingGroup.split(`\n`));

const seeds = seedLine.split(" ").map((x) => parseInt(x));
const resourceMaps = mappingGroups.map((mappingGroup) =>
  mappingGroup.map((mappingGroup) =>
    mappingGroup.split(" ").map((x) => parseInt(x))
  )
);

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

console.log(seeds);
console.log(resourceMaps);
console.log(locations);
console.log(leastLocation);
