import { existsSync, mkdirSync, writeFile } from "fs";
import chalk from "chalk";

/**
 * Array writable write function.
 * @param path - The file path to export to.
 * @param contents - What to write
 */
export function writeFiles(path: string, contents: string | string[]): void {
  // Make dir if not exist dir
  const dir_path = path.replace(/logs.*\..*$/, "logs");
  if (!existsSync(dir_path)) {
    mkdirSync(dir_path);
  }
  writeFile(path, stripAnsi(`${contents}`), (err) => {
    // If the export fails
    if (err) {
      console.log(chalk`{red Failed to write log.}
                        ${err}`);
      throw err;
    }
    console.log(chalk`{green Write log Complete.}`);
  });
}

export function stripAnsi(text: string): string {
  return text.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
}
