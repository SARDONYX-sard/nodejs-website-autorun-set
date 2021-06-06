import "chromedriver";
import chrome = require("selenium-webdriver/chrome");
import webdriver = require("selenium-webdriver");

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
