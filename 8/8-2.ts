import { getAntinodes, Position } from "./common";

const antinodes = getAntinodes(getPairAntinodes);

console.log(antinodes.length);

function getPairAntinodes([a, b]: [Position, Position], lines: string[]): Position[] {
  const antinodes: Position[] = [a, b];
  let provisional: Position[], valid: Position[];
  let m = 0;

  do {
    m++;
    provisional = [
      [a[0] + (a[0] - b[0]) * m, a[1] + (a[1] - b[1]) * m],
      [b[0] + (b[0] - a[0]) * m, b[1] + (b[1] - a[1]) * m]
    ];
    valid = provisional.filter(([x, y]) => lines[x]?.[y] !== undefined);
    antinodes.push(...valid);
  } while (valid.length > 0);

  return antinodes;
}

