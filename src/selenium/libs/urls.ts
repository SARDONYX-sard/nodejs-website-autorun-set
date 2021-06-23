import chalk from "chalk";
import moment from "moment";
import { By, WebDriver } from "selenium-webdriver";
// common libs
import { execCommand, writeFiles } from "../../libs";
// selenium libs
import { build } from ".";

export const default_urls = [
  "https://www.google.com/",
  "https://www.google.com/",
  "https://www.google.com/",
  "https://www.google.com/",
  "https://www.google.com/",
  "https://www.google.com/",
];

/**
 * Simple Functions for Web Scraping
 *
 * @param domain - example: "google.com"
 * @param url - example: "https://www.google.com/"
 * @param getLatest_title - Arbitrary DOM operations
 * @param getPublished_elem - Arbitrary DOM operations
 * @param driver - example: const driver = await build()
 */
export async function getUrlContent<T, U>(
  domain: string,
  url: string,
  getElement1: (driver: WebDriver) => Promise<T>,
  getElement2: (driver: WebDriver) => Promise<U>,
  driver: WebDriver,
): Promise<string | undefined> {
  if (RegExp(`^https?://.*${domain}.*`).test(url)) {
    try {
      // Get URL title
      const title = await driver.getTitle();

      // get latest title
      const element1 = await getElement1(driver);

      // Get published
      const element2 = await getElement2(driver);

      const log = chalk`
        Title: {yellow ${title}}
        Element1: {cyan ${element1}}
        Element2: {green ${element2}}
        `;

      return log;

      // Catch error
    } catch (e) {
      const error_log = chalk`{red Failed to get element.}`;
      console.log(error_log);
      console.log(e.message);
    }
  }
}

/**
 * sample function
 *
 * Write log file of date information taken from google.
 * @param url default: https://www.google.com/search?q=today+date+and+weather
 *
 * Location example:
 *
 * - America: URL + "&gl=us&hl=en&pws=0&gws_rd=cr"
 * @param sleepMs sleep time minute  - default: 5000 ms
 * @param isTest Add the word `-test` to filename? - default: false
 */
export async function getDateFromGoogle(
  url = "https://www.google.com/search?q=today+date+and+weather",
  sleepMs = 5000,
  isTest = false,
): Promise<string | undefined> {
  // setting
  const driver = await build({
    args: ["--headless", "--disable-gpu"],
    w3c: false,
  });
  // date (ex.2021-6-23)
  const today = moment().format("YYYY-MM-DD");

  try {
    // Go to Google URL
    await driver.get(url);
    await driver.sleep(sleepMs);

    const log = await getUrlContent(
      // domain:RegExp
      "google.com/search",
      url,

      // Get date from HTML Element
      async (driver: WebDriver) => {
        // Get a day of the week (ex. Monday)
        const dow = await driver.findElement(By.id("wob_dts")).getText();

        return `Today: ${today} ${dow}`;
      },

      // Get date from HTML Element
      async (driver: WebDriver) => {
        // Temperature: ℃(ex. 27)
        const celsius = await driver.findElement(By.id("wob_tm")).getText();
        // Probability of precipitation: (ex. 60%)
        const pp = await driver.findElement(By.id("wob_pp")).getText();
        // (ex. Clear evening to cloudy)
        const weather = await driver.findElement(By.id("wob_dc")).getText();

        return `
                  Temperature: ${celsius}℃
                  Probability of precipitation: ${pp}
                  Weather: ${weather}
              `;
      },

      driver,
    );

    console.log(
      chalk`{green ---------------- Result -------------------}
            ${log}`,
    );

    // write log
    if (log) {
      await writeFiles(`src/selenium/logs/${today}.txt`, log, isTest);
      return log;
    }

    // catch error
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't get date from google. ");

    // finally
  } finally {
    await driver.quit();
    execCommand("pause");
  }
}
