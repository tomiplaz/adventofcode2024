import { getLinesFromFile } from "../utils";

const INPUT_FILENAME = "6/input.txt";

type Position = [number, number];
type Orientation = 'n' | 'e' | 's' | 'w';

const lines = getLinesFromFile(INPUT_FILENAME);
const start = getStart(lines);
const result = getResult(lines, start);

console.log(result);

function getStart(lines: string[]): Position {
  for (let x = 0, l = lines.length; x < l; x++) {
    const y = lines[x].indexOf('^');
    if (y !== -1) {
      return [x, y];
    }
  }
  throw new Error("start not found");
}

function getResult(lines: string[], [x, y]: Position): number {
  let result = 0;
  let o: Orientation = 'n';

  do {
    result++;
    let [nextX, nextY] = getNextPosition([x, y], o);
    while (lines[nextX]?.[nextY] === '#') {
      o = getNextOrientation(o);
      [nextX, nextY] = getNextPosition([x, y], o);
    }
    [x, y] = [nextX, nextY];
  } while (lines[x]?.[y] !== undefined);

  return result;
}

function getNextPosition([x, y]: [number, number], o: Orientation): Position {
  switch (o) {
    case 'n':
      return [x - 1, y];
    case 'e':
      return [x, y + 1];
    case 's':
      return [x + 1, y];
    case 'w':
      return [x, y - 1];
    default:
      throw new Error("invalid orientation");
  }
}

function getNextOrientation(o: Orientation): Orientation {
  switch (o) {
    case 'n':
      return 'e';
    case 'e':
      return 's';
    case 's':
      return 'w';
    case 'w':
      return 'n';
    default:
      throw new Error("invalid orientation");
  }
}

