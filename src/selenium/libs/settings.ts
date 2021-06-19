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
export function build(options = {}): ThenableWebDriver {
  // Setting webdriver args
  const capabilities = Capabilities.chrome();

  capabilities.set("chromeOptions", options);

  return new Builder().withCapabilities(capabilities).build();
}
