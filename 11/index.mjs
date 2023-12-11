// @ts-check
/**
 * @param {number} expansionFactor
 * @returns {function (string[]): number}
 */
const createSolverWithExpansionFactor = (expansionFactor) => (inputStrings) => {
  /**
   * @type {{ row: number, col: number }[]}
   */
  // @ts-ignore
  const galaxies = inputStrings.flatMap((inputString, row) =>
    inputString
      .split("")
      .map((char, col) => (char === "#" ? { row, col } : undefined))
      .filter(Boolean)
  );

  const emptyRows = inputStrings
    .map((inputString, row) => ({ isEmpty: !inputString.includes("#"), row }))
    .filter(({ isEmpty }) => isEmpty)
    .map(({ row }) => row);
  const emptyCols = Array.from({ length: inputStrings[0].length })
    .map((_, col) => ({
      isEmpty: inputStrings.every((inputString) => inputString[col] === "."),
      col,
    }))
    .filter(({ isEmpty }) => isEmpty)
    .map(({ col }) => col);

  return galaxies
    .flatMap((galaxyA, i) =>
      galaxies.slice(i + 1).map((galaxyB) => {
        const rowDiff = Math.abs(galaxyA.row - galaxyB.row);
        const colDiff = Math.abs(galaxyA.col - galaxyB.col);
        const emptyRowBonus = emptyRows.filter(
          (row) => row > galaxyA.row !== row > galaxyB.row
        ).length;
        const emptyColBonus = emptyCols.filter(
          (col) => col > galaxyA.col !== col > galaxyB.col
        ).length;
        return (
          rowDiff +
          colDiff +
          (expansionFactor - 1) * emptyRowBonus +
          (expansionFactor - 1) * emptyColBonus
        );
      })
    )
    .reduce((a, b) => a + b);
};

export const solvePart1 = createSolverWithExpansionFactor(2);

export const solvePart2 = createSolverWithExpansionFactor(1000000);
