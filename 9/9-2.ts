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
      const undefSize = getUndefSize(disk, i);
      const [fID, fEnd, fSize] = getLastFileByMaxSize(disk, undefSize);
      compacted.splice(i, fSize, ...Array.from({ length: fSize }).map(_ => fID));
      compacted.splice(fEnd - fSize, fSize, ...Array.from({ length: fSize }).map(_ => undefined));
    }
  }
  return compacted;
}

function getUndefSize(disk: Disk, start: number): number {
  const end = disk.slice(start).findIndex(v => v !== undefined);
  return end - start;
}

function getLastFileByMaxSize(disk: Disk, maxSize: number): [number | undefined, number, number] {
  let block: Block = undefined;
  let size = 0;
  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] !== undefined) {
      if (disk[i] === block) {
        size++;
      } else {
        if (size <= maxSize) {
          return [block, i, size];
        }
        block = disk[i];
        size = 1;
      }
    } else {
      if (block !== undefined) {
        if (size <= maxSize) {
          return [block, i, size];
        }
      }
    }
  } 
  return [undefined, 0, 0];
}

