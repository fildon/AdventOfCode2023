// @ts-check
/**
 * @param {string} hand
 * @param {boolean} jokersWild
 */
const getHandTypeOrder = (hand, jokersWild) => {
  const jokerBonus = jokersWild
    ? hand.split("").filter((char) => char === "J").length
    : 0;
  const nonJokers = hand.split("").filter((char) => char !== "J");

  const cardCounts = Object.values(
    (jokersWild ? nonJokers : hand.split("")).reduce(
      (counts, char) => ({ ...counts, [char]: (counts[char] || 0) + 1 }),
      {}
    )
  ).sort((a, b) => b - a);

  const most = cardCounts[0] ?? 0;
  const secondMost = cardCounts[1] ?? 0;

  // five of a kind
  if (most + jokerBonus === 5) return 0;
  // four of a kind
  if (most + jokerBonus === 4) return 1;
  // full house
  if (most + secondMost + jokerBonus === 5) return 2;
  // three of a kind
  if (most + jokerBonus === 3) return 3;
  // two pair
  if (most + secondMost + jokerBonus === 4) return 4;
  // one pair
  if (most + jokerBonus === 2) return 5;
  // high card
  return 6;
};

/**
 * @param {string} a
 * @param {string} b
 * @param {boolean} jokersWild
 */
const handTypeComparator = (a, b, jokersWild) =>
  getHandTypeOrder(a, jokersWild) - getHandTypeOrder(b, jokersWild);

/**
 * @param {string} a
 * @param {string} b
 * @param {boolean} jokersWild
 */
const highCardComparator = (a, b, jokersWild) => {
  const cardOrder = jokersWild
    ? ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]
    : ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
  for (let i = 0; i < a.length; i++) {
    const charComparison = cardOrder.indexOf(a[i]) - cardOrder.indexOf(b[i]);
    if (charComparison) return charComparison;
  }
  return 0;
};

/**
 * @param {string[]} inputStrings
 */
export const solvePart1 = (inputStrings) =>
  inputStrings
    .map((line) => line.split(" "))
    .map(([hand, bid]) => ({ hand, bid: parseInt(bid) }))
    .sort(
      (a, b) =>
        handTypeComparator(a.hand, b.hand, false) ||
        highCardComparator(a.hand, b.hand, false)
    )
    .map(({ bid }, i, arr) => ({ bid, rank: arr.length - i }))
    .map(({ bid, rank }) => bid * rank)
    .reduce((a, b) => a + b);

/**
 * @param {string[]} inputStrings
 */
export const solvePart2 = (inputStrings) =>
  inputStrings
    .map((line) => line.split(" "))
    .map(([hand, bid]) => ({ hand, bid: parseInt(bid) }))
    .sort(
      (a, b) =>
        handTypeComparator(a.hand, b.hand, true) ||
        highCardComparator(a.hand, b.hand, true)
    )
    .map(({ bid }, i, arr) => ({ bid, rank: arr.length - i }))
    .map(({ bid, rank }) => bid * rank)
    .reduce((a, b) => a + b);
