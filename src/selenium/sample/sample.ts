import * as moment from "moment";
import { By, WebDriver } from "selenium-webdriver";

// common libs
import { echoError, writeFile } from "../../libs";
// selenium libs
import { build, getUrlContent } from "../libs";
// import { loopTab } from "../libs";

// async function loopUrl() {
//   await loopTab()();
// }

async function getDateFromGoogle() {
  // setting
  const driver = await build({
    args: ["--headless", "--disable-gpu"],
    w3c: false,
  });

  // Go to Google URL
  await driver.get("https://www.google.com/search?q=today+date");

  const log = await getUrlContent(
    // domain:RegExp
    "google.com/search",

    // Test target for regular expressions
    "https://www.google.com/search?q=today+date",

    // Get date from HTML Element
    async (driver: WebDriver) => {
      const day_card = await driver.findElement(By.className("card-section"));
      const vk_bk = await day_card.findElement(By.className("vk_bk"));

      return await vk_bk.findElement(By.css("span")).getText();
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
  writeFile(`src/selenium/sample/logs/${today}.txt`, log ?? "Nothing data");
}

// loopUrl().catch(echoError);
getDateFromGoogle().catch(echoError);
