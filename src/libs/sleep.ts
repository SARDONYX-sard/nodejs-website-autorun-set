import * as chalk from "chalk";

/**
 * Wait time
 * @param ms - Wait millisecond. (default = 5000ms)
 */
export function sleep(ms = 5000) {
  console.log(chalk`Wait: for {cyan ${ms}} ms`);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
