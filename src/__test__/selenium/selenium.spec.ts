import { ThenableWebDriver } from "selenium-webdriver";

import { build, createNewTab, switchNewTab, default_urls } from "../../selenium/libs/index";

let driver: ThenableWebDriver;
describe("seleniumのlibsテスト", () => {
  beforeAll(() => {
    driver = build();
  });

  afterAll(() => {
    return driver.quit();
  });

  it("create&switch Tab Test", async () => {
    // Entry point
    await driver.get(default_urls[0]);

    // Create a new Tab
    await createNewTab(default_urls[0], driver);

    // Switch to a new tab
    await switchNewTab(0, driver);

    // 要素を取得
    const title = await driver.getTitle();

    // 検証
    expect(title).toBe("Google");
  });
});
