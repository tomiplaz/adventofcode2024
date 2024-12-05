import { getLinesFromFile } from "../utils";

const INPUT_FILENAME = "4/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME);
const strings = getStrings(lines);
const result = getResult(strings);

console.log(result);

function getStrings(lines: string[]): string[] {
  const columns = Array
    .from({ length: lines[0].length})
    .map(_ => '');
  const fDiagonals = Array
    .from({ length: lines.length + lines[0].length - 1 })
    .map(_ => '');
  const bDiagonals = Array
    .from({ length: fDiagonals.length })
    .map(_ => '');

  for (let i = 0, l = lines.length; i < l; i++) {
    for (let j = 0, k = columns.length; j < k; j++) {
      const c = lines[i][j];
      columns[j] += c;
      // Thanks https://stackoverflow.com/a/43311126
      fDiagonals[i + j] += c;
      bDiagonals[j - i + columns.length - 1] += c;
    }
  }

  return [
    ...lines,
    ...columns,
    ...fDiagonals,
    ...bDiagonals
  ];
}

function getResult(strings: string[]): number {
  const regex = /XMAS/g;
  return strings.reduce((prev, curr) => {
    const rev = curr.split('').reverse().join('');
    return prev +
      (curr.match(regex)?.length ?? 0) +
      (rev.match(regex)?.length ?? 0)
  }, 0);
}

