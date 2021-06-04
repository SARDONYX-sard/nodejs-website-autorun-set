import { WebDriver } from "selenium-webdriver";
import { sleep } from "../../libs/sleep";
import { build, default_urls } from "./index";

export async function createNewTab(url: string, driver: WebDriver) {
  // Create a new Tab
  await driver.executeScript("window.open(arguments[0], '_blank')", url);
}

export async function switchNewTab(count: number, driver: WebDriver) {
  // Switch to a new tab
  const tabs = await driver.getAllWindowHandles();
  await driver.switchTo().window(tabs[count + 1]);
}

export async function loopTab(
  url_lists = default_urls,
  waitMs?: number,
  buildOpts?: Object,
): Promise<void> {
  try {
    // Build webdriver
    const driver = await build(buildOpts);

    // Entry point
    await driver.get(url_lists[0]);

    let count = 0;
    for (const url of url_lists) {
      // Create a new Tab
      await createNewTab(url, driver);

      // Switch to a new tab
      await switchNewTab(count, driver);

      // Wait time
      await sleep(waitMs);
      count++;
    }

    await driver.quit();

    // catch error
  } catch (error) {
    throw error;
  }
}
