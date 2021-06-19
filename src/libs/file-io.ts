import { mkdir, writeFile } from "fs/promises";
import chalk from "chalk";

/**
 * Array writable write function.
 * @param path - The file path to export to.
 * @param contents - What to write
 */
export async function writeFiles(path: string, contents: string | string[]): Promise<void> {
  try {
    // Make dir if not exist dir
    const dir_path = path.replace(/([^/]+?)?$/, "");
    mkdir(dir_path, { recursive: true });

    // write file
    await writeFile(path, stripAnsi(`${contents}`));
    console.log(chalk`{green Completed writing the log.}`);

    // error catch
  } catch (error) {
    console.log(chalk`{red Failed to write log.}\n${error}`);
  }
}

/**
 * Remove color codes from strings.
 * @param text string
 */
export function stripAnsi(text: string): string {
  return text.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
}
