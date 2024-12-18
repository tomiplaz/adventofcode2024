import { getEquations, Equation, getResult } from "./common";

const equations = getEquations();
const trueEquations = getTrueEquations(equations);
const result = getResult(trueEquations);

console.log(result);

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

