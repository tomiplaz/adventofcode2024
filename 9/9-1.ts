import { getLinesFromFile } from "../utils";

const INPUT_FILENAME = "9/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME);
const map = getDiskMap(lines[0]);

console.log(map.length);

function getDiskMap(s: string): number[] {
  return s.match(/\d{1}/g)?.map(Number) ?? [];
};

