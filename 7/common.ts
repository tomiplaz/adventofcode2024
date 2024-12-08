import { getLinesFromFile, getNumsFromStr } from "../utils";

const INPUT_FILENAME = "7/input.txt";

export type Equation = [number, number[]];

export function getEquations(): Equation[] {
  return getLinesFromFile(INPUT_FILENAME).map(line => {
    const split = line.split(':');
    return [Number(split[0]), getNumsFromStr(split[1])];
  });
}

export function getResult(equations: Equation[]): number {
  return equations.reduce((prev, [res]) => prev + res, 0);
}

