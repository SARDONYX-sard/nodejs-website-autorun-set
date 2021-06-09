import { WebDriver } from "selenium-webdriver";
import chalk, { red } from "chalk";

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
