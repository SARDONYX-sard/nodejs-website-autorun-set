import "chromedriver";
import { Builder, Capabilities, ThenableWebDriver } from "selenium-webdriver";
import { ServiceBuilder, setDefaultService } from "selenium-webdriver/chrome";

// Create driver instance
const service = new ServiceBuilder().build();
setDefaultService(service);

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
export function build(options = {}): ThenableWebDriver {
  // Setting webdriver args
  const capabilities = Capabilities.chrome();

  capabilities.set("chromeOptions", options);

  return new Builder().withCapabilities(capabilities).build();
}
