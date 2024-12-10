import { getDisk, getResult, Disk, Block } from "./common";

const disk = getDisk();
const compacted = getCompacted(disk);
const result = getResult(compacted);

console.log(result);

function getCompacted(disk: Disk): Disk {
  const compacted = disk.slice();
  for (let i = 0, l = compacted.length; i < l; i++) {
    if (compacted[i] === undefined) {
      if (compacted.slice(i).every(v => v === undefined)) {
        return compacted;
      }
      const lastFileIndex = findLastFileIndex(compacted);
      compacted.splice(i, 1, compacted[lastFileIndex]);
      compacted.splice(lastFileIndex, 1, undefined);
    }
  }
  return compacted;
}

function findLastFileIndex(disk: Disk): number {
  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] !== undefined) {
      return i;
    }
  }
  return -1;
}

