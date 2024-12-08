import { getLinesFromFile, getNumsFromStr } from "../utils";

const INPUT_FILENAME = "7/input.txt";

type Equation = [number, number[]];
type Operator = '+' | '*';

const lines = getLinesFromFile(INPUT_FILENAME);
const equations = getEquations(lines);
const trueEquations = getTrueEquations(equations);
const result = getResult(trueEquations);

console.log(result);

function getEquations(lines: string[]): Equation[] {
  return lines.map(line => {
    const split = line.split(':');
    return [Number(split[0]), getNumsFromStr(split[1])];
  });
}

function getTrueEquations(equations: Equation[]): Equation[] {
  return equations.filter(([r, operands]) => {
    const operators: Operator[] = Array
      .from({ length: operands.length - 1 })
      .map(_ => '+');
    let tempR = 0;
  });
}

function getResult(equations: Equation[]): number {
  return equations.reduce((prev, [res]) => prev + res, 0);
}

