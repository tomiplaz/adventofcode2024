import { getLinesFromFile, sum } from "../utils";
import { getSortedColumns, Columns } from "./common";

const INPUT_FILENAME = "1/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME);
const columns = getSortedColumns(lines);
const scores = getScores(columns);
const result = sum(scores);

console.log(result);

function getScores(columns: Columns): number[] {
  const rightOcc: Record<number, number> = {};
  for (let i = 0, l = columns[1].length; i < l; i++) {
    const num = columns[1][i];
    if (rightOcc[num] === undefined) {
      rightOcc[num] = 1;
    } else {
      rightOcc[num]++;
    }
  }
  return columns[0].map(v => v * (rightOcc[v] ?? 0))
}

