import { exec } from "child_process";

/**
 * Function to output an error and terminate the process.
 * @param error
 */
export function echoError(error: any) {
  console.log(error.message);
  process.exit(1);
}

/**
 * Function to execute Windows commands.
 * @param command
 *
 * example:
 *
 * execCommand("pause")    // Setting
 *
 * ↓
 *
 * // Execute the following command.

 * npx ts-node src/selenium/main.ts --pause
 */
export function execCommand(command: string) {
  if ((process.argv[2] = command)) {
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
