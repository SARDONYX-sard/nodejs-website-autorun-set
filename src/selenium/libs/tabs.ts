import { WebDriver } from "selenium-webdriver";
import { build, default_urls } from ".";

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
type AsyncFunc<T> = () => Promise<T>;
type Options = {
  args: string[];
  w3c: boolean;
};
/**
 * @param url_lists
 * @param waitMs
 * @param buildOpts
 *
 * - example:
 *
 *{
 *
 *    args: [
 *
 *      // Use headless mode
 *      "--headless",
 *
 *      // Flag temporarily required in headless mode (will be unnecessary soon)
 *      "--disable-gpu",
 *
 *      // Disable all extensions. Also disable user scripts.
 *      "--disable-extensions",
 *
 *      "--no-sandbox",
 *
 *      `--window-size=1980,1200`,
 *
 *    ],
 *
 *    w3c: false
 *
 *}
 */
export function loopTab(
  url_lists = default_urls,
  waitMs = 5000,
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

        await driver.sleep(waitMs);
        count++;
      }
    } finally {
      await driver.quit();
    }
  };
}
