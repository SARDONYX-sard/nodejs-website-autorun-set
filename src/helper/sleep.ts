import chalk from "chalk";

/**
 * Wait time
 * @param ms - Wait millisecond. (defaultValue: 5000)
 */
export function sleep(ms = 5000): Promise<unknown> {
  console.log(chalk`Wait: for {cyan ${ms}} ms`);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
