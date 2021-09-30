import { existsSync, promises as fsp } from "fs";
import dayjs from "dayjs";

// selenium libs
import { getArizonaWeatherFromGoogle } from "./urls";

describe("getArizonaWeatherFromGoogle", () => {
  it("should be able to get the date", async () => {
    // create log filePath
    const today = dayjs().format("YYYY-MM-DD");
    const filePath = `src/selenium/test/${today}-test.txt`;
    const dir = filePath.replace(/(?:[^\\/]+?)?$/, "");
    try {
      // create log filePath
      const log = await getArizonaWeatherFromGoogle({
        writeLogPath: `src/selenium/test/${today}-test.txt`,
      });

      // test
      return expect(log).toMatch(/Title:[\s\S]*Element1:[\s\S]*Element2:/g);

      // catch error
    } catch (e) {
      return expect(e).toMatch("error");
    } finally {
      if (existsSync(dir)) {
        await fsp.unlink(filePath);
        await fsp.rmdir(dir, { recursive: true });
      }
    }
  }, 30000);
});
