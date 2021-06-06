import { Options, WebDriver } from "selenium-webdriver";
import { sleep } from "../../libs/sleep";
import { build, default_urls } from "./index";

/**
 *  Create a new Tab
 * @param url - URL
 * @param driver - build Driver
 */
export async function createNewTab(url: string, driver: WebDriver): Promise<void> {
  await driver.executeScript("window.open(arguments[0], '_blank')", url);
}

/**
 * Switch to a new tab
 * @param count -  Want to open tab number
 * @param driver - Build Driver
 */
export async function switchNewTab(count: number, driver: WebDriver): Promise<void> {
  const tabs = await driver.getAllWindowHandles();
  await driver.switchTo().window(tabs[count + 1]);
}

// ----------------------------------------------------------------

/**
 * @param {Object} buildOpts
 * - example:
 *
 *{
 *
 *    args: [
 *
 *      "--headless",
 *
 *      "--no-sandbox",
 *
 *      "--disable-gpu",
 *
 *      `--window-size=1980,1200`,
 *
 *    ],
 *
 *    w3c: false
 *
 *}
 */
type AsyncFunc<T> = () => Promise<T>;
export function loopTab(
  url_lists = default_urls,
  waitMs?: number,
  buildOpts?: Options,
): AsyncFunc<void> {
  let driver: WebDriver;

  return async () => {
    try {
      // Build webdriver
      driver = await build(buildOpts);

      // Entry point
      await driver.get(url_lists[0]);

      let count = 0;
      for (const url of url_lists) {
        await createNewTab(url, driver);

        await switchNewTab(count, driver);

        await sleep(waitMs);
        count++;
      }
    } finally {
      await driver.quit();
    }
  };
}
