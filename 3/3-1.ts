import { getLinesFromFile } from "../utils";

const INPUT_FILENAME = "3/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME);
const operands = getOperands(lines);
const result = getResult(operands);

console.log(result);

function getOperands(lines: string[]): number[] {
  const operands: number[] = [];
  for (let i = 0, l = lines.length; i < l; i++) {
    const ops = lines[i]
      .match(/mul\(\d{1,3}\,\d{1,3}\)/g)
      ?.flatMap(m => m.match(/\d+/g)?.map(Number) ?? [])
      ?? [];
    operands.push(...ops);
  }
  return operands;
}

function getResult(operands: number[]): number {
  let result = 0;
  for (let i = 0, l = operands.length; i < l; i += 2) {
    result += operands[i] * operands[i + 1];
  }
  return result;
}

