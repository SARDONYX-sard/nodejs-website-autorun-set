import { sleep } from "../../libs/sleep";
import { build, default_urls } from "./index";

export async function selenium(url_lists = default_urls, waitMs = 5000): Promise<void> {
  try {

    // Build webdriver
    const driver = await build();

    // Entry point
    await driver.get(url_lists[0]);

    let count = 0;
    for (const url of url_lists) {
      // Create a new Tab
      await driver.executeScript("window.open(arguments[0], '_blank')", url);

      // Switch to a new tab
      const tabs = await driver.getAllWindowHandles();
      await driver.switchTo().window(tabs[count + 1]);

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
