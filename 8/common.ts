import { getLinesFromFile } from "../utils";

export type Position = [number, number];
export type Antennas = Record<string, Position[]>;

const INPUT_FILENAME = "8/input.txt";

export function getAntinodes(
  getPairAntinodes: (pairs: [Position, Position], lines: string[]) => Position[]
): Position[] {
  const lines = getLinesFromFile(INPUT_FILENAME);
  const antinodes: Position[] = [];
  const antennas = getAntennas(lines);

  for (const freq in antennas) {
    const pairs = getPairs(antennas[freq]);
    for (let i = 0, l = pairs.length; i < l; i++) {
      const pairAntinodes = getPairAntinodes(pairs[i], lines);
      for (let j = 0, k = pairAntinodes.length; j < k; j++) {
        const [pA, pB] = pairAntinodes[j]
        if (!antinodes.find(([a, b]) => a === pA && b === pB)) {
          antinodes.push(pairAntinodes[j]);
        }
      }
    }
  }

  return antinodes;
}

export function getAntennas(lines: string[]): Antennas {
  const antennas: Antennas = {};
  for (let i = 0, l = lines.length; i < l; i++) {
    for (let j = 0, k = lines[i].length; j < k; j++) {
      if (lines[i][j] !== '.') {
        const freq = lines[i][j];
        antennas[freq] = antennas[freq] ?? [];
        antennas[freq].push([i, j]);
      }
    }
  }
  return antennas;
}

export function getPairs(list: Position[]): [Position, Position][] {
  const pairs: [Position, Position][] = [];
  for (let i = 0, l = list.length; i < l; i++) {
    for (let j = i + 1, k = list.length; j < k; j++) {
      pairs.push([list[i], list[j]]);
    }
  }
  return pairs;
}

