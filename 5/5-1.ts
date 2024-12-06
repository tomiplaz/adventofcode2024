import { getRulesAndUpdates, Update, Rule, getUpdateRules, getResult, isUpdateValid } from "./common";

const [rules, updates] = getRulesAndUpdates();
const validUpdates = getValidUpdates(updates, rules);
const result = getResult(validUpdates);

console.log(result);

function getValidUpdates(updates: Update[], rules: Rule[]): Update[] {
  return updates.filter(u => isUpdateValid([u, getUpdateRules(u, rules)]));
}

