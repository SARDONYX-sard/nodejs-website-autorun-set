import * as chalk from "chalk";

/**
 * Wait time
 * @param ms - Wait millisecond
 */
export function sleep(ms = 5000) {
  console.log(chalk`Wait: for {blue ${ms}} ms`);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
