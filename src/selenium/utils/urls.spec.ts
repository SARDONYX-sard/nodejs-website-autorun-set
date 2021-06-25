import { promises as fsp } from "fs";
import moment from "moment";
// selenium libs
import { getArizonaWeatherFromGoogle } from "./urls";

describe("getArizonaWeatherFromGoogle", () => {
  it("should be able to get the date", async () => {
    // create log path
    const today = moment().format("YYYY-MM-DD");
    const path = `src/selenium/test/${today}-test.txt`;
    const dir = path.replace(/(?:[^\\/]+?)?$/, "");
    try {
      // create log path
      const today = moment().format("YYYY-MM-DD");
      const log = await getArizonaWeatherFromGoogle({
        writeLogPath: `src/selenium/test/${today}-test.txt`,
      });
      // test
      return expect(log).toMatch(/Title:[\s\S]*Element1:[\s\S]*Element2:/g);

      // catch error
    } catch (e) {
      return expect(e).toMatch("error");
    } finally {
      await fsp.unlink(path);
      await fsp.rmdir(dir);
    }
  }, 30000);
});
