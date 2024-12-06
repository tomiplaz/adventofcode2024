import { getRulesAndUpdates, Update, Rule, getUpdateRules, getResult, isUpdateValid } from "./common";

type Pair = [Update, Rule[]];

const [rules, updates] = getRulesAndUpdates();
const pairs = getInvalidUpdatesWithRules(updates, rules);
const rectifiedUpdates = getRectifiedUpdates(pairs);
const result = getResult(rectifiedUpdates);

console.log(result);

function getInvalidUpdatesWithRules(updates: Update[], rules: Rule[]): Pair[] {
  const pairs: [Update, Rule[]][] = [];
  for (let i = 0, l = updates.length; i < l; i++) {
    const updateRules = getUpdateRules(updates[i], rules);
    if (!isUpdateValid([updates[i], updateRules])) {
      pairs.push([updates[i], updateRules]);
    }
  }
  return pairs;
}

function getRectifiedUpdates(pairs: Pair[]): Update[] {
  //
}

