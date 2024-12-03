import { getLinesFromFile } from "../utils";

const INPUT_FILENAME = "3/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME);
const enabled = getEnabled(lines);
const operands = getOperands(enabled);
const result = getResult(operands);

console.log(result);

function getEnabled(lines: string[]): string[] {
  const enabled: string[] = [];
  for (let i = 0, l = lines.length; i < l; i++) {
    const splitByDont = lines[i].split("don't()");
    // Starts with enabled
    if (i === 0) {
      enabled.push(splitByDont[0]);
      splitByDont.splice(0, 1);
    }
    for (let j = 0, k = splitByDont.length; j < k; j++) {
      const splitByDo = splitByDont[j].split("do()");
      // Enabled is what's on the right
      splitByDo.splice(0, 1);
      enabled.push(...splitByDo);
    }
  }
  return enabled;
}

function getOperands(strings: string[]): number[] {
  const operands: number[] = [];
  for (let i = 0, l = strings.length; i < l; i++) {
    const ops = strings[i]
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

