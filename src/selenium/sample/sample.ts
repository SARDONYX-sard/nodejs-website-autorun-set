import moment from "moment";
import { By, WebDriver } from "selenium-webdriver";
// common libs
import { echoError, execCommand, writeFiles } from "../../libs";
// selenium libs
import { build, getUrlContent } from "../libs";

// --------loop Tab sample function----------
// import { loopTab } from "../libs";

// async function loopUrl() {
//   await loopTab()();
// }

// loopUrl().catch(echoError);
// ------------------------------------------

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
      const div = await day_card.findElement(By.css("div"));
      const day_of_the_week = await (await day_card.findElement(By.css("div"))).getText();
      return (await div.findElement(By.css("span")).getText()) + " " + day_of_the_week;
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
  writeFiles(`src/selenium/sample/logs/${today}.txt`, log ?? "Nothing data");

  // pause command
  execCommand("pause");
}

getDateFromGoogle().catch(echoError);
