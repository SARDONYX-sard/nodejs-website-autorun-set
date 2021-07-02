import moment from "moment";
import { promises as fsp } from "fs";

import { writeFiles } from "./file-io";

describe("file-io", () => {
  it("should remove the color code", async () => {
    // Create path
    const today = moment().format("YYYY-MM-DD");
    const path = `src/selenium/test/${today}-file-io.txt`;
    const dir = path.replace(/(?:[^/]+?)?(?:-test)?$/, "");

    try {
      // write log
      await writeFiles(
        path,
        // contents
        `
        \u001b[30mH \u001b[31me \u001b[32ml \u001b[33ml \u001b[0mo
        \u001b[34mW \u001b[35mo \u001b[36mr \u001b[37ml \u001b[0md
        `,
      );

      // Read
      const result = (await fsp.readFile(path, "utf-8")).replace(/\s*/g, "");
      return expect(result).toBe("HelloWorld");

      // error catch
    } catch (error) {
      return expect(error).toMatch("error");

      // finally
    } finally {
      // Remove the file and directory
      await fsp.unlink(path);
      await fsp.rmdir(dir);
    }
  });
});
