import { getLinesFromFile } from "../utils";

const INPUT_FILENAME = "4/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME);
const result = getResult(lines);

console.log(result);

function getResult(lines: string[]): number {
  let result = 0;
  for (let i = 1, l = lines.length - 1; i < l; i++) {
    for (let j = 1, k = lines[i].length - 1; j < k; j++) {
      if (isSquareXMas(lines, i, j)) {
        result++
      }
    }
  }
  return result;
}

function isSquareXMas(lines: string[], centerX: number, centerY: number): boolean {
  const diagonals: [string, string] = [
    [
      lines[centerX - 1][centerY - 1],
      lines[centerX][centerY],
      lines[centerX + 1][centerY + 1]
    ].join(''),
    [
      lines[centerX - 1][centerY + 1],
      lines[centerX][centerY],
      lines[centerX + 1][centerY - 1]
    ].join('')
  ];
  return diagonals.every(v => v === 'MAS' || v === 'SAM');
}

