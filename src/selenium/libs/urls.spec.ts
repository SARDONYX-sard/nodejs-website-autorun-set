import fs, { promises as fsp } from "fs";
import moment from "moment";
// selenium libs
import { getDateFromGoogle } from "./urls";

describe("getDateFromGoogle", () => {
  it("should be able to get the date", async () => {
    try {
      const log = await getDateFromGoogle(undefined, true);
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
          Title: today date - Google 検索
          Element1: 2021年6月22日 火曜日, 2021年6月22日
          Element2: 愛知県豊田市の日付
          `,
        );
      }

      // read test log file
      const log = await fsp.readFile(path, "utf-8");
      // test
      return expect(log).toMatch(/Title:[\s\S]*Element1:[\s\S]*Element2:/g);

      // catch error
    } catch (e) {
      return expect(e).toMatch("error");

      // finally
    } finally {
      await fsp.rmdir(path, { recursive: true });
    }
  });
});
