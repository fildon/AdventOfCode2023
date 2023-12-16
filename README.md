# Advent Of Code 2023

My solutions to the puzzles of [Advent of Code 2023](https://adventofcode.com/2023)

Solutions are written in JavaScript and run with Node. I used Node `v21.4.0`. Solutions might still work when run on other versions of Node, but I cannot guarantee this.

Each day is a directory. Each directory contains an `index.mjs` which exports a pair of pure functions, one to solve part 1 and another to solve part 2.

Each directory also includes a `test.mjs` which can be run with Node to assert the correctness of the solutions.

You can run all tests from the root directory by running the following command:

```shell
node --test **/test.mjs
```
