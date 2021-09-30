import chalk from "chalk";
import { promises as fsp } from "fs";

/**
 * Array writable write function.
 * @param path - The file path to export to.
 * @param contents - What to write
 */
export async function writeFiles(path: string, contents: string | string[]): Promise<void> {
  try {
    // Make dir if not exist dir
    const dir_path = path.replace(/(?:[^/]+?)?$/, "");
    await fsp.mkdir(dir_path, { recursive: true });

    // write file
    await fsp.writeFile(path, stripAnsi(`${contents}`));
    console.log(chalk`{green Completed writing the log.}`);
    return;
    // error catch
  } catch (error) {
    console.log(chalk`{red Failed to write log.}\n${error}`);
    throw error;
  }
}

/**
 * Remove color codes from strings.
 * @param text string
 */
export function stripAnsi(text: string): string {
  return text.replace(/[\u001b\u009b][[()#;?]*(?:\d{1,4}(?:;\d{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
}
