import { exec } from "child_process";

/**
 * Function to output an error and terminate the process.
 * @param error
 * @param isThrow if you want to throw error.
 */
export function echoError(error: Error, isThrow = false): void {
  console.log(error.message);
  if (isThrow) {
    throw error;
  }
  process.exit(1);
}

/**
 * Function to execute Windows commands.
 * @param command - Execute command
 * @param args - option: Command arg
 *
 * @example:pause script
 * // 1. In sample.ts...
 * execCommand("pause", /[^(-{1})](-{2})?pause/);
 *
 * // 2. In terminal...
 * npx ts-node src/selenium/sample/sample.ts --pause
 * //or
 * npx ts-node src/selenium/sample/sample.ts pause
 */
export function execCommand(command: string, arg: string | RegExp = command): boolean {
  // if arg is string
  if (typeof arg === "string" && arg === process.argv[2]) {
    execute(command);
    return true;
  }

  // if arg is RegExp
  if (arg == RegExp(arg) && arg.test(process.argv[2])) {
    execute(command);
    return true;
  }
  return false;
}

/**
 * Function to execute shell commands.
 * @param command execute command
 * @returns Whether it could be executed.
 */
export function execute(command: string): boolean {
  exec(command, (error) => (error ? console.error(`[ERROR] ${error}`) : false));
  return true;
}
