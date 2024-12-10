import { getLinesFromFile } from "../utils";

const INPUT_FILENAME = "9/input.txt";

export type Block = number | undefined;
export type Disk = Block[];

export function getDisk(): Disk {
  const [line] = getLinesFromFile(INPUT_FILENAME);
  const map = line.match(/\d{1}/g)?.map(Number) ?? [];
  return map.flatMap((v, i) => {
    return Array.from({ length: v }).map(_ => i % 2 === 0 ? i / 2 : undefined);
  })
}

export function getResult(disk: Disk): number {
  return disk
    .slice(0, disk.indexOf(undefined))
    .reduce((acc, v, i) => acc! + v! * i, 0)!;
}

