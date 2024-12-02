import { getNumsFromStr } from "../utils";

export type Columns = [number[], number[]];

export function getSortedColumns(lines: string[]): [number[], number[]] {
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

  function ascending(a: number, b: number): number {
    return a - b;
  }
}

