import { getLinesFromFile } from "../utils";

const INPUT_FILENAME = "8/input.txt";

type Position = [number, number];
type Antennas = Record<string, Position[]>;

const lines = getLinesFromFile(INPUT_FILENAME);
const antinodes = getAntinodes(lines);
const result = antinodes.length;

console.log(result);

function getAntinodes(lines: string[]): Position[] {
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

function getAntennas(lines: string[]): Antennas {
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

function getPairs(list: Position[]): [Position, Position][] {
  const pairs: [Position, Position][] = [];
  for (let i = 0, l = list.length; i < l; i++) {
    for (let j = i + 1, k = list.length; j < k; j++) {
      pairs.push([list[i], list[j]]);
    }
  }
  return pairs;
}

function getPairAntinodes([a, b]: [Position, Position], lines: string[]): Position[] {
  const provisional: Position[] = [
    [a[0] + a[0] - b[0], a[1] + a[1] - b[1]],
    [b[0] + b[0] - a[0], b[1] + b[1] - a[1]]
  ];
  return provisional.filter(([x, y]) => lines[x]?.[y] !== undefined);
}

