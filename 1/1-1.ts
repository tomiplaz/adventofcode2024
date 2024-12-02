import { getLinesFromFile, sum } from "../utils";
import { getSortedColumns, Columns } from "./common";

const INPUT_FILENAME = "1/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME);
const columns = getSortedColumns(lines);
const distances = getDistances(columns);
const result = sum(distances);

console.log(result);

function getDistances(columns: Columns): number[] {
  const distances: number[] = [];
  for (let i = 0, l = columns[0].length; i < l; i++) {
    distances.push(Math.abs(columns[0][i] - columns[1][i]));
  }
  return distances;
}

