import { ThenableWebDriver } from "selenium-webdriver";

import { build } from "./settings";
import { createNewTab, loopTab, switchNewTab } from "./tabs";

let driver: ThenableWebDriver;
describe("tabs", () => {
  beforeAll(() => {
    driver = build({
      args: ["--headless", "--disable-gpu", "--window-size=1024,768"],
      w3c: false,
    });
  });

  afterAll(async () => await driver.quit());

  it("should be able to create and switch tabs", async () => {
    const url = "https://www.google.com/";
    // Entry point
    await driver.get(url);

    // Create a new Tab
    await createNewTab(url, driver);

    // Switch to a new tab
    await switchNewTab(0, driver);

    // get title element
    const title = await driver.getTitle();

    expect(title).toBe("Google");
  }, 30000);
});

describe("tabs", () => {
  it("should automatically cycle through the URLs", async () => {
    const loopUrl = loopTab(undefined, 3000, {
      args: ["--headless", "--disable-gpu", "--disable-extensions"],
      w3c: false,
    });

    const titles = await loopUrl();
    // Verification
    titles.forEach((title) => {
      expect(title).toBe("Google");
    });
  }, 30000);
});
