import { getAntinodes, Position } from "./common";

const antinodes = getAntinodes(getPairAntinodes);

console.log(antinodes.length);

function getPairAntinodes([a, b]: [Position, Position], lines: string[]): Position[] {
  const provisional: Position[] = [
    [a[0] + a[0] - b[0], a[1] + a[1] - b[1]],
    [b[0] + b[0] - a[0], b[1] + b[1] - a[1]]
  ];
  return provisional.filter(([x, y]) => lines[x]?.[y] !== undefined);
}

