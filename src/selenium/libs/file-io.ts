import * as fs from "fs";

/**
 * Array writable write function.
 * @param path - The file path to export to.
 * @param contents - What to write
 */
export function writeFile(path: string, contents: string | string[]) {
  fs.writeFile(path, stripAnsi(`${contents}`), (err) => {
    // If the export fails
    if (err) {
      console.log("Failed to export." + err);
      throw err;
    }
    console.log("Output log.");
  });
}

export function stripAnsi(text: string) {
  return text.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
}
