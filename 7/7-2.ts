import { getEquations, Equation, getResult } from "./common";

const equations = getEquations();
const trueEquations = getTrueEquations(equations);
const result = getResult(trueEquations);

console.log(result);

function getTrueEquations(equations: Equation[]): Equation[] {
  return equations.filter(([result, operands]) => {
    const [first, ...rest] = operands;
    const numOperators = operands.length - 1;
    for (let mask = 0, max = Math.pow(3, numOperators); mask < max; mask++) {
      const terMask = getTernaryMask(mask, numOperators);
      let acc = first;
      for (let i = 0, l = rest.length; i < l; i++) {
        acc = getOpResult(acc, rest[i], terMask[i]);
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

function getTernaryMask(mask: number, l: number): string {
  const ter = mask.toString(3);
  return Array.from({ length: l - ter.length }).map(_ => '0').join('') + ter;
}

function getOpResult(a: number, b: number, op: string): number {
  switch (op) {
    case '0':
      return a + b;
    case '1':
      return a * b;
    case '2':
      return Number(a.toString() + b.toString());
    default:
      throw new Error("invalid op");
  }
}
