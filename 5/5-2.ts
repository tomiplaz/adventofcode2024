import { getRulesAndUpdates, Update, Rule, getUpdateRules, getResult, isUpdateValid, isRuleValid } from "./common";

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
  const rectified: Update[] = [];
  for (let i = 0, l = pairs.length; i < l; i++) {
    const [update, rules] = pairs[i];
    do {
      for (let j = 0, k = rules.length; j < k; j++) {
        if (!isRuleValid(update, rules[j])) {
          update.splice(update.indexOf(rules[j][0]), 1);
          update.splice(update.indexOf(rules[j][1]), 0, rules[j][0]);
          break;
        }
      }
    } while (!isUpdateValid([update, rules]))
    rectified.push(update);
  }
  return rectified;
}

