import chalk, { red } from "chalk";
import moment from "moment";
import { By, WebDriver } from "selenium-webdriver";
// common libs
import { execCommand, writeFiles } from "../../libs";
// selenium libs
import { build } from "../libs";

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
  getLatest_title: (driver: WebDriver) => Promise<T>,
  getPublished_elem: (driver: WebDriver) => Promise<U>,
  driver: WebDriver,
): Promise<string | undefined> {
  if (RegExp(`^https?://.*${domain}.*`).test(url)) {
    try {
      // Get URL title
      const title = await driver.getTitle();

      // get latest title
      const latest_title = await getLatest_title(driver);

      // Get published
      const published = await getPublished_elem(driver);

      const log = chalk`
        Title: {blue ${title}}
        Element1: {cyan ${latest_title}}
        Element2: {green ${published}}
        `;

      // console.log(log);
      return log;

      // Catch error
    } catch (e) {
      const error_log = red`Failed to get element.`;
      console.log(error_log);
      console.log(e.message);
      await driver.quit();
      throw e;
    }
  }
}

/**
 * sample function
 *
 * Write log file of date information taken from google.
 * @param url URL default: google.com/search?q=today+date
 *
 * example:
 *
 * - America "https://www.google.com/search?q=today+date&gl=us&hl=en&pws=0&gws_rd=cr"
 */
export async function getDateFromGoogle(
  url = "https://www.google.com/search?q=today+date",
): Promise<void> {
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
    url,
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
  writeFiles(`src/selenium/logs/${today}.txt`, log ?? "Nothing data");

  // pause command
  execCommand("pause");
}
