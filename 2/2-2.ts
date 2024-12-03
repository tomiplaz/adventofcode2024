import { getLinesFromFile, getNumsFromStr } from "../utils";

const INPUT_FILENAME = "2/input.txt";

const lines = getLinesFromFile(INPUT_FILENAME);
const reports = getReports(lines);
const result = reports.filter(isReportValid).length;

console.log(result);

function getReports(lines: string[]): number[][] {
  return lines.map(getNumsFromStr);
}

function isReportValid(report: number[], k: number): boolean {
  for (let i = 0, l = report.length; i < l - 1; i++) {
    const diff = report[i] - report[i + 1];
    if (
      diff === 0 ||
      Math.abs(diff) > 3 ||
      (i > 0 && (report[i - 1] - report[i] > 0 ? diff < 0 : diff > 0))
    ) {
      if (k === -1) {
        return false;
      }
      for (let j = 0; j < l; j++) {
        const clone = [...report];
        clone.splice(j, 1);
        if (isReportValid(clone, -1)) {
          return true;
        }
      }
      return false;
    }
  }
  return true;
}

