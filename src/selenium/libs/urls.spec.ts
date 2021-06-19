import { readFile, rmdir } from "fs/promises";
import { By, ThenableWebDriver, WebDriver } from "selenium-webdriver";
import moment from "moment";
// common libs
import { writeFiles } from "../../libs";
import { build } from "./settings";
import { getUrlContent } from "./urls";

let driver: ThenableWebDriver;
describe("tabs", () => {
  beforeAll(() => {
    // setting
    driver = build({
      args: ["--headless", "--disable-gpu", "--window-size=1024,768"],
      w3c: false,
    });
  });

  afterAll(() => driver.quit());

  it("should be able to create and switch tabs", async () => {
    const url = "https://www.google.com/search?q=today+date";
    // Go to Google URL
    await driver.get(url);

    const log = await getUrlContent(
      // domain:RegExp
      "google.com/search",
      url,
      // Get date from HTML Element
      async (driver: WebDriver) => {
        const day_card = await driver.findElement(By.className("card-section"));
        const div = await day_card.findElement(By.css("div"));
        const day_of_the_week = await (await day_card.findElement(By.css("div"))).getText();
        return (await div.findElement(By.css("span")).getText()) + " " + day_of_the_week;
        expect(result).toBe("HelloWorld");
      },

      // Get locate from HTML Element
      async (driver: WebDriver) => {
        const elm = await driver.findElement(By.className("card-section"));
        return await (await elm.findElement(By.className("vk_gy"))).getText();
      },
      driver,
    );

    console.log(log);
    // write log
    const today = moment().format("YYYY-MM-DD");
    writeFiles(`src/selenium/logs/${today}.txt`, log ?? "Nothing data");

    const path = `src/selenium/logs/${today}.txt`;
    const result = (await readFile(path, "utf-8")).replace(/\s*/g, "").slice(0);
    console.log(result);
    rmdir(path, { recursive: true });
  });
});
