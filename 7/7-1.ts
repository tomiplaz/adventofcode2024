import { warn } from "console";
import { getLinesFromFile, getNumsFromStr } from "../utils";

const INPUT_FILENAME = "7/input.txt";

type Equation = [number, number[]];

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
  return equations.filter(([result, operands]) => {
    const [first, ...rest] = operands;
    const numOperators = operands.length - 1;
    for (let mask = 0, max = Math.pow(2, numOperators); mask < max; mask++) {
      const binMask = getBinaryMask(mask, numOperators);
      let acc = first;
      for (let i = 0, l = rest.length; i < l; i++) {
        acc = binMask[i] === '1' ? acc * rest[i] : acc + rest[i];
        if (acc > result) {
          break;
        }
      }
      if (acc === result) {
        return true;
      }
    }
    return false;
  });
}

function getBinaryMask(mask: number, l: number): string {
  const bin = mask.toString(2);
  return Array.from({ length: l - bin.length }).map(_ => '0').join('') + bin;
}

function getResult(equations: Equation[]): number {
  return equations.reduce((prev, [res]) => prev + res, 0);
}

