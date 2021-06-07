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
 * @param command
 *
 * @example:pause script
 * // 1. In sample.ts...
 * execCommand("pause")
 *
 * // 2. In terminal...
 * npx ts-node src/selenium/sample/sample.ts pause
 */
export function execCommand(command: string): void {
  if (process.argv[2] == command) {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`[ERROR] ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  }
}