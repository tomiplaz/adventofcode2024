import { readFileSync } from "fs";

export function getLinesFromFile(path: string, dropEmpty = true): string[] {
  try {
    const lines = readFileSync(path, "utf8").split("\n");
    return dropEmpty ? lines.filter(v => v !== "") : lines;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function sum(nums: number[]): number {
  return nums.reduce((prev, curr) => prev + curr, 0);
}

export function getNumsFromStr(str: string): number[] {
  return str.match(/\d+/g)?.map(Number) ?? [];
};

export function findLastIndex<T>(arr: T[], test: (v: T) => boolean): number {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (test(arr[i])) {
      return i;
    }
  }
  return -1;
}

