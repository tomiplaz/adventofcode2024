import { getLinesFromFile, findLastIndex } from "../utils";

const INPUT_FILENAME = "9/input.txt";

type Block = number | undefined;
type Disk = Block[];

const lines = getLinesFromFile(INPUT_FILENAME);
const map = getDiskMap(lines[0]);
const disk = getDisk(map);
const compacted = getCompacted(disk);
const result = getResult(compacted);

console.log(result);

function getDiskMap(s: string): number[] {
  return s.match(/\d{1}/g)?.map(Number) ?? [];
};

function getDisk(map: number[]): Disk {
  return map.flatMap((v, i) => Array.from({ length: v }).map(_ => i % 2 === 0 ? i / 2 : undefined));
}

function getCompacted(disk: Disk): Disk {
  const compacted = disk.slice();
  for (let i = 0, l = compacted.length; i < l; i++) {
    if (compacted[i] === undefined) {
      if (compacted.slice(i).every(v => v === undefined)) {
        return compacted;
      }
      const lastFileIndex = findLastIndex<Block>(compacted, v => v !== undefined);
      compacted.splice(i, 1, compacted[lastFileIndex]);
      compacted.splice(lastFileIndex, 1, undefined);
    }
  }
  return compacted;
}

function getResult(disk: Disk): number {
  return disk
    .slice(0, disk.indexOf(undefined))
    .reduce((acc, v, i) => acc! + v! * i, 0)!;
}

