// @ts-check
/**
 * @param {string} inputLine
 * @return {{ digits: string[], columnNumber: number }[]}
 */
const extractEnginePartNumbers = (inputLine) => {
  const chars = inputLine.split("");
  let mode = "searching";
  let partialDigitParse = [];
  let partialColNumber = 0;
  const numbers = [];
  for (let i = 0; i < chars.length; i++) {
    const thisChar = chars[i];
    if (mode === "searching") {
      if (/\d/.exec(thisChar)) {
        partialDigitParse.push(thisChar);
        partialColNumber = i;
        mode = "consuming";
        continue;
      }
    }
    if (mode === "consuming") {
      if (/\d/.exec(thisChar)) {
        partialDigitParse.push(thisChar);
      } else {
        numbers.push({
          digits: partialDigitParse,
          columnNumber: partialColNumber,
        });
        partialDigitParse = [];
        mode = "searching";
      }
    }
  }
  if (mode === "consuming") {
    numbers.push({
      digits: partialDigitParse,
      columnNumber: partialColNumber,
    });
  }
  return numbers;
};

/**
 * @param {string[]} inputLines
 */
export const solvePart1 = (inputLines) =>
  inputLines
    .flatMap((line, lineNumber) =>
      extractEnginePartNumbers(line).map((parts) => ({
        lineNumber,
        ...parts,
      }))
    )
    .map((part) => ({
      ...part,
      neighbours: [-1, 0, +1]
        .map((lineDiff) => inputLines[part.lineNumber + lineDiff])
        .filter(Boolean)
        .flatMap((line) =>
          line
            .slice(
              Math.max(0, part.columnNumber - 1),
              part.columnNumber + part.digits.length + 1
            )
            .split("")
        ),
    }))
    .filter(({ neighbours }) =>
      neighbours.some((char) => {
        if (/\d/.exec(char)) return false;
        if (/\./.exec(char)) return false;
        return true;
      })
    )
    .map(({ digits }) => parseInt(digits.join("")))
    .reduce((a, b) => a + b);
