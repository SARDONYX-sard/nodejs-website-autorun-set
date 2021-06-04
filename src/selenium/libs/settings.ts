import "chromedriver";
import chrome = require("selenium-webdriver/chrome");
import webdriver = require("selenium-webdriver");
// const { Builder, By, until } = webdriver;

// Create driver instance
const service = new chrome.ServiceBuilder().build();
chrome.setDefaultService(service);

/**
 * @param {Object} options
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
 *      other chrome options
 *
 *    ]
 *
 *}
 */
export function build(options?: Object) {
  const custom_options = options || {};
  // Setting webdriver args
  const capabilities = webdriver.Capabilities.chrome();

  capabilities.set(
    "chromeOptions",
    Object.assign(custom_options, {
      args: [],
    }),
  );

  return new webdriver.Builder().withCapabilities(capabilities).build();
}
