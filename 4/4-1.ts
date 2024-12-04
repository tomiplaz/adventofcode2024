import { getLinesFromFile } from "../utils";

const INPUT_FILENAME = "3/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME);
const strings = getStrings(lines);
const result = getResult(strings);

console.log(result);

function getStrings(lines: string[]): string[] {
  let columns = Array
    .from({ length: lines[0].length})
    .map(_ => '');
  let diagonals = Array
    .from({ length: lines.length + lines[0].length - 1 })
    .map(_ => '');

  for (let i = 0, l = lines.length; i < l; i++) {
    for (let j = 0, k = lines[i].length; j < k; j++) {
      columns[j] += lines[i][j];
      //
    }
  }

  return [
    ...lines,
    ...columns,
    ...diagonals
  ];
}

function getResult(strings: string[]): number {
  //
}

