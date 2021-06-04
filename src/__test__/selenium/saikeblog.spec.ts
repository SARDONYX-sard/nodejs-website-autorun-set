import "chromedriver";
import { Builder, By, ThenableWebDriver } from "selenium-webdriver";
import moment from "moment";

let driver: ThenableWebDriver;

describe("saikeblogに対するseleniumTest", () => {
  beforeAll(() => {
    driver = new Builder().forBrowser("chrome").build();
  });

  afterAll(() => {
    return driver.quit();
  });

  it("正常系_表示_ページタイトル", async () => {
    // 指定したURLに遷移する
    await driver.get("https://saikeblog.com");

    // 要素を取得
    const title = await driver.getTitle();

    // 検証
    expect(title).toBe("さいけの技術ブログ");
  });

  it("正常系_遷移_技術ページ", async () => {
    // 指定したURLに遷移する
    await driver.get("https://saikeblog.com");

    // タブの「技術」要素を取得し、クリックする
    await driver.findElement(By.id("menu-item-37")).click();

    // 要素を取得
    const title = await driver.getTitle();
    const currentUrl = await driver.getCurrentUrl();

    // 検証
    expect(title).toBe("技術 – さいけの技術ブログ");
    expect(currentUrl).toBe("https://saikeblog.com/category/%e6%8a%80%e8%a1%93/");
  });

  it("正常系_表示_コピーライト", async () => {
    // 指定したURLに遷移する
    await driver.get("https://saikeblog.com");

    // 要素を取得
    const title = await driver.getTitle();
    const copyright = await driver.findElement(By.className("source-org")).getText();

    // 現在の年を取得する
    const year = moment(new Date()).format("YYYY");

    // 検証
    expect(title).toBe("さいけの技術ブログ");
    expect(copyright).toBe("Copyright © " + year + " さいけの技術ブログ All Rights Reserved.");
  });

  it("正常系_整合_URL", async () => {
    // 指定したURLに遷移する
    await driver.get("https://saikeblog.com");

    // 要素を取得
    const currentUrl = await driver.getCurrentUrl();

    // 検証
    expect(currentUrl).toBe("https://saikeblog.com/");
  });

  it("正常系_遷移_技術ページ", async () => {
    // 指定したURLに遷移する
    await driver.get("https://saikeblog.com");

    // タブの「技術」要素を取得し、クリックする
    await driver.findElement(By.id("menu-item-37")).click();

    // 要素を取得
    const title = await driver.getTitle();
    const currentUrl = await driver.getCurrentUrl();

    expect(title).toBe("技術 – さいけの技術ブログ");
    expect(currentUrl).toBe("https://saikeblog.com/category/%e6%8a%80%e8%a1%93/");
  });

  it("正常系_動作_検索", async () => {
    // 指定したURLに遷移する
    await driver.get("https://saikeblog.com");

    // 検索ボックス要素にjavaを入力し検索する
    await driver.findElement(By.name("s")).sendKeys("java\n");

    // 要素を取得
    const title = await driver.getTitle();
    const currentUrl = await driver.getCurrentUrl();

    expect(title).toBe("“java” の検索結果 – さいけの技術ブログ");
    expect(currentUrl).toBe("https://saikeblog.com/?s=java");
  });

  it("正常系_動作_ページング_次へボタン", async () => {
    // 指定したURLに遷移する
    await driver.get("https://saikeblog.com");

    // 画面下部にスクロールするjavascriptを実行
    await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");

    // 「>」要素をクリックする
    await driver.findElement(By.className("next")).click();

    // 要素を取得
    const currentUrl = await driver.getCurrentUrl();

    expect(currentUrl).toBe("https://saikeblog.com/page/2/");
  });

  it("正常系_動作_ページング_前へボタン", async () => {
    // 指定したURLに遷移する
    await driver.get("https://saikeblog.com/page/2/");

    // 画面下部にスクロールするjavascriptを実行
    await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");

    // 「<」要素をクリックする
    await driver.findElement(By.className("prev")).click();

    // 要素を取得
    const currentUrl = await driver.getCurrentUrl();

    expect(currentUrl).toBe("https://saikeblog.com/");
  });
});
