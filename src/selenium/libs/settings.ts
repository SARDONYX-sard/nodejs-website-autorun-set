import "chromedriver";

import * as chrome from "selenium-webdriver/chrome";
import * as webdriver from "selenium-webdriver";

// Create driver instance
const service = new chrome.ServiceBuilder().build();
chrome.setDefaultService(service);

/**
 * @param options
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
export function build(options = {}): webdriver.ThenableWebDriver {
  // Setting webdriver args
  const capabilities = webdriver.Capabilities.chrome();

  capabilities.set("chromeOptions", options);

  return new webdriver.Builder().withCapabilities(capabilities).build();
}
