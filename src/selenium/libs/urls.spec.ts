import fs, { promises as fsp } from "fs";
import moment from "moment";
// selenium libs
import { getArizonaWeatherFromGoogle } from "./urls";

describe("getArizonaWeatherFromGoogle", () => {
  it("should be able to get the date", async () => {
    try {
      const log = await getArizonaWeatherFromGoogle(undefined, undefined, true);
      // test
      return expect(log).toMatch(/Title:[\s\S]*Element1:[\s\S]*Element2:/g);

      // catch error
    } catch (e) {
      return expect(e).toMatch("error");
    }
  }, 30000);

  it("should be able to read test log file", async () => {
    // create log path
    const today = moment().format("YYYY-MM-DD");
    const path = `src/selenium/logs/${today}-test.txt`;
    try {
      if (!fs.existsSync(path)) {
        await fsp.writeFile(
          path,
          `
          Title: arizona weather - Google Search
          Element1: Today: 2021-06-23 Wednesday 7:00 AM
          Element2:
                    Temperature: 84°C
                    Precipitation: 59%
                    Weather: Light rain showers
          `,
        );
      }

      // read test log file
      const log = await fsp.readFile(path, "utf-8");
      // test
      await fsp.rmdir(path, { recursive: true });
      return expect(log).toMatch(/Title:[\s\S]*Element1:[\s\S]*Element2:/g);

      // catch error
    } catch (e) {
      return expect(e).toMatch("error");
    }
  });
});
