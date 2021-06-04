import "chromedriver";
import chrome = require("selenium-webdriver/chrome");
import webdriver = require("selenium-webdriver");
// const { Builder, By, until } = webdriver;

// Create driver instance
const service = new chrome.ServiceBuilder().build();
chrome.setDefaultService(service);

// Setting webdriver args
const capabilities = webdriver.Capabilities.chrome();
capabilities.set("chromeOptions", {
  args: [
    // "--headless",
    // "--no-sandbox",
    // "--disable-gpu",
    // `--window-size=1980,1200`,
    // other chrome options
  ],
});

export function build() {
  return new webdriver.Builder().withCapabilities(capabilities).build();
}
