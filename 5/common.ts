import { getLinesFromFile } from "../utils";

const INPUT_FILENAME = "5/input.txt";

export type Rule = [number, number];
export type Update = number[];
export type Pair = [Update, Rule[]];

export function getRulesAndUpdates(): [Rule[], Update[]] {
  const lines = getLinesFromFile(INPUT_FILENAME, false);
  const emptyIndex = lines.indexOf("");
  const rules = lines.slice(0, emptyIndex).map(v => v.split('|').map(Number));
  const updates = lines.slice(emptyIndex + 1).map(v => v.split(',').map(Number));
  return [rules as Rule[], updates];
}

export function getUpdateRules(update: Update, rules: Rule[]): Rule[] {
  return rules.filter(rule => rule.every(v => update.indexOf(v) !== -1));
}

export function isUpdateValid([update, rules]: Pair): boolean {
  return rules.every(([a, b]) => update.indexOf(a) < update.indexOf(b));
}

export function getResult(updates: Update[]): number {
  return updates.reduce(
    (prev, curr) => prev + curr[(curr.length - 1) / 2],
    0
  );
}

