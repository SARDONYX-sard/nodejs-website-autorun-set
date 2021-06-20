import moment from "moment";
import { promises as fsp } from "fs";

import { writeFiles } from "./file-io";

describe("file-io", () => {
  // beforeAll(() => {});

  // afterAll(() => {});

  it("file-io", async () => {
    // write log
    const today = moment().format("YYYY-MM-DD");
    const path = `src/selenium/logs/${today}.txt`;
    await writeFiles(
      path,
      // contents
      `
      \u001b[30mH \u001b[31me \u001b[32ml \u001b[33ml \u001b[0mo
      \u001b[34mW \u001b[35mo \u001b[36mr \u001b[37ml \u001b[0md
      `,
    );

    // read
    const result = (await fsp.readFile(path, "utf-8")).replace(/\s*/g, "");
    console.log(result);
    expect(result).toBe("HelloWorld");
    fsp.rmdir(path, { recursive: true });
  });
});