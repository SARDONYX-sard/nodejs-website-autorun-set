import { promises as fsp } from "fs";
import chalk from "chalk";

/**
 * Array writable write function.
 * @param path - The file path to export to.
 * @param contents - What to write
 * @param isTest - Add the word `-test` to filename? - default: false
 */
export async function writeFiles(
  path: string,
  contents: string | string[],
  isTest = false,
): Promise<void> {
  try {
    let filePath = path;
    // Add the word `-test` to filename
    if (isTest) {
      filePath = filePath.replace(/([^/]+?)?(\..*)$/, "$1-test$2");
    }

    // Make dir if not exist dir
    const dir_path = path.replace(/(?:[^/]+?)?(?:-test)?$/, "");
    await fsp.mkdir(dir_path, { recursive: true });

    // write file
    await fsp.writeFile(filePath, stripAnsi(`${contents}`));
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
  return text.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
}
