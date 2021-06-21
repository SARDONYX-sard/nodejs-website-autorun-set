import { promises as fsp } from "fs";
import moment from "moment";
// selenium libs
import { getDateFromGoogle } from "./urls";

describe("getDateFromGoogle", () => {
  it("should be able to get the date", async () => {
    // create log path
    const today = moment().format("YYYY-MM-DD");
    const path = `src/selenium/logs/${today}-test.txt`;
    try {
      const log = await getDateFromGoogle(undefined, true);
      // test
      return expect(log).toMatch(/Title:[\s\S]*Element1:[\s\S]*Element2:/g);
    } catch (e) {
      expect(e).toMatch("error");
    } finally {
      await fsp.rmdir(path, { recursive: true });
    }
  });
});
