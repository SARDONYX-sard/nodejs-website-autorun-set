import { WebDriver } from "selenium-webdriver";
// selenium > utils
import { build, default_urls } from ".";
import type { AsyncFunc, Options } from "../types/tabs";

/**
 *  Create a new Tab
 * @param url - URL
 * @param driver - build Driver
 */
export async function createNewTab(url: string, driver: WebDriver): Promise<void> {
  try {
    await driver.executeScript("window.open(arguments[0], '_blank')", url);
  } catch (e) {
    console.error(e);
    throw new Error("Couldn't create new tab'");
  }
}

/**
 * Switch to a new tab
 * @param count -  Want to open tab number
 * @param driver - Build Driver
 */
export async function switchNewTab(count: number, driver: WebDriver): Promise<void> {
  try {
    const tabs = await driver.getAllWindowHandles();
    await driver.switchTo().window(tabs[count + 1]);
  } catch (e) {
    console.error(e);
    throw new Error("Couldn't switch tab'");
  }
}

// ----------------------------------------------------------------

/**
 * Closure function that traverses the URL and returns an array of site titles.
 * @param url_lists @default ["https://www.google.com/"] * 5
 * @param waitMs sleep time ms. @default 5000
 * @param buildOpts @default {}
 * @example
 *
 *   {
 *    args: [
 *      "--headless", // Use headless mode
 *      "--disable-gpu", // Flag temporarily required in headless mode (will be unnecessary soon)
 *      "--disable-extensions", // Disable all extensions. Also disable user scripts.
 *      "--no-sandbox",
 *      `--window-size=1980,1200`,
 *    ],
 *    w3c: false
 *   }
 * @returns `An array of site's title`
 */
export function loopTab(
  url_lists = default_urls,
  waitMs = 5000,
  buildOpts?: Options,
): AsyncFunc<string[] | undefined> {
  let driver: WebDriver;

  /**
   * Looping URLs
   */
  return async (): Promise<string[] | undefined> => {
    try {
      const titles: string[] = [];

      // Build webdriver
      driver = await build(buildOpts);

      // Entry point
      await driver.get(url_lists[0]);

      let count = 0;
      for (const url of url_lists) {
        await createNewTab(url, driver);

        await switchNewTab(count, driver);

        // Get the element
        titles.push(await driver.getTitle());

        await driver.sleep(waitMs);
        count++;
      }

      return titles;
    } catch (e) {
      console.error(e);
    } finally {
      await driver.quit();
    }
  };
}
