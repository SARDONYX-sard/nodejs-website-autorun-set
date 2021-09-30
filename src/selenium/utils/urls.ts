import chalk from "chalk";
import dayjs from "dayjs";
import { By } from "selenium-webdriver";

// helper
import { execCommand, writeFiles } from "../../helper";
// selenium > utils
import { build } from "./";

import type { ScrapingContent, ScrapingFunc } from "../types/urls";

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
export const getUrlContent: ScrapingFunc<string, string> = async ({
  url = "https://www.google.com/",
  domain = "google.com",
  getElement1,
  getElement2,
  driver,
}) => {
  if (RegExp(`^https?://.*${domain}.*`).test(url)) {
    try {
      // Get URL title
      const title = await driver.getTitle();

      // get latest title
      const element1 = await getElement1(driver);

      // Get published
      const element2 = await getElement2(driver);

      // return result log
      return chalk`
        Title: {yellow ${title}}
        Element1: {cyan ${element1}}
        Element2: {green ${element2}}
        `;

      // Catch error
    } catch (e: unknown) {
      if (e instanceof Error) {
        const error_log = chalk`{red Failed to get element.}`;
        console.log(error_log);
        console.log(e.message);
      } else {
        throw new Error("got the not Error instance!");
      }
    }
  }
};

/**
 * Sample Function.(Get the weather for Arizona, USA)
 *
 * Write log file of date information taken from google.
 * @param url @default "https://www.google.com/search?q=arizona+weather&gl=us&hl=en&pws=0&gws_rd=cr"
 *
 * Location example: America: URL + "&gl=us&hl=en&pws=0&gws_rd=cr"
 *
 * @param sleepMs sleep time ms - @default 5000
 * @param writeLogPath write log filename - @default `src/selenium/logs/${today}.txt`
 */
export async function getArizonaWeatherFromGoogle({
  url = "https://www.google.com/search?q=arizona+weather&gl=us&hl=en&pws=0&gws_rd=cr",
  sleepMs = 5000,
  writeLogPath = `src/selenium/logs/${dayjs().format("YYYY-MM-DD")}.txt`,
}: Partial<ScrapingContent> = {}): Promise<string | undefined> {
  // setting
  const driver = build({
    args: ["--headless", "--disable-gpu"],
    w3c: false,
  });

  try {
    // Go to Google URL
    await driver.get(url);
    await driver.sleep(sleepMs);

    const log = await getUrlContent({
      // domain:RegExp
      domain: "google.com/search",
      url,

      // Get date from HTML Element
      getElement1: async () => {
        // Get a day of the week (ex. Monday)
        const dow = await driver.findElement(By.id("wob_dts")).getText();
        const today = dayjs().format("YYYY-MM-DD"); // date (ex.2021-6-23)
        return `Today: ${today} ${dow}`;
      },

      // Get date from HTML Element
      getElement2: async () => {
        // Temperature: °C(ex. 27)
        const celsius = await driver.findElement(By.id("wob_tm")).getText();
        // Probability of precipitation: (ex. 60%)
        const pp = await driver.findElement(By.id("wob_pp")).getText();
        // (ex. Light rain showers)
        const weather = await driver.findElement(By.id("wob_dc")).getText();

        return `
                  Temperature: ${celsius}°C
                  Precipitation: ${pp}
                  Weather: ${weather}
              `;
      },

      driver,
    });

    console.log(
      chalk`{green ---------------- Result -------------------}
            ${log}`,
    );

    // write log
    if (log) {
      await writeFiles(writeLogPath, log);
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
