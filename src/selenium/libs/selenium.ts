import { sleep } from "../../libs/sleep";
import { build, default_urls } from "./index/index";

export async function selenium(url_lists?: string[]) {
  const urls = url_lists ?? default_urls;

  // Build webdriver
  const driver = await build();

  // Entry point
  await driver.get(urls[0]);

  let count = 0;
  for (const url of urls) {
    // Create a new Tab
    await driver.executeScript("window.open(arguments[0], '_blank')", url);
    // Switch to a new tab
    const tabs = await driver.getAllWindowHandles();
    await driver.switchTo().window(tabs[count + 1]);
    // wait
    await sleep(5000);
    count++;
  }

  await driver.quit();
}
