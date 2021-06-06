import * as fs from "fs";
import * as chalk from "chalk";

/**
 * Array writable write function.
 * @param path - The file path to export to.
 * @param contents - What to write
 */
export function writeFile(path: string, contents: string | string[]) {
  fs.writeFile(path, stripAnsi(`${contents}`), (err) => {
    // If the export fails
    if (err) {
      console.log(chalk`{red Failed to write log.}
                        ${err}`);
      throw err;
    }
    console.log(chalk`{Write log Complete.}`);
  });
}

export function stripAnsi(text: string) {
  return text.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
}
