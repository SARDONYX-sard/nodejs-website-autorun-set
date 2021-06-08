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
 * @param args - option: Command arg
 *
 * @example:pause script
 * // 1. In sample.ts...
 * execCommand("pause", --pause)
 *
 * // 2. In terminal...
 * npx ts-node src/selenium/sample/sample.ts --pause
 */
export function execCommand(command: string, arg: string | RegExp = command): void {
  // if arg is string
  if (typeof arg === "string" && arg === process.argv[2]) {
    execute(command);
    return;
  }

  // if arg is RegExp
  if (arg instanceof RegExp && arg.test(process.argv[2])) {
    execute(command);
    return;
  }
}

function execute(command: string): void {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`[ERROR] ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}
