import { getLinesFromFile, getNumsFromStr, sum } from "../utils";

const INPUT_FILENAME = "1/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME);
const columns = getSortedColumns(lines);
const distances = getDistances(columns);
const result = sum(distances);

console.log(result);

function getSortedColumns(lines: string[]): [number[], number[]] {
  const columns: [number[], number[]] = [[], []];
  for (let i = 0, l = lines.length; i < l; i++) {
    const numbers = getNumsFromStr(lines[i]);
    columns[0].push(numbers[0]);
    columns[1].push(numbers[1]);
  }
  return [
    columns[0].sort(ascending),
    columns[1].sort(ascending)
  ];
}

function ascending(a: number, b: number): number {
  return a - b;
}

function getDistances(columns: [number[], number[]]): number[] {
  const distances: number[] = [];
  for (let i = 0, l = columns[0].length; i < l; i++) {
    distances.push(Math.abs(columns[0][i] - columns[1][i]));
  }
  return distances;
}

