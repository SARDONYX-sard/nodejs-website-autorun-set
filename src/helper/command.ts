import { exec } from "child_process";

/**
 * Function to output an error and terminate the process.
 * @param error
 */
export function echoError(error: Error): void {
  console.log(error.message);
  process.exit(1);
}

/**
 * Function to execute Windows commands.
 * @param command - Execute command
 * @param args - option: Command argument (defaultValue: command)
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
export function execCommand(command: string, arg: string | RegExp = command): void {
  // if arg is string
  if (typeof arg === "string" && arg === process.argv[2]) return execute(command);

  // if arg is RegExp
  if (arg == RegExp(arg) && arg.test(process.argv[2])) return execute(command);
}

/**
 * Function to execute shell commands.
 * @param command execute command
 */
export function execute(command: string): void {
  exec(command, (error) => console.error(`[ERROR] ${error}`));
}
