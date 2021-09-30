import { promises as fsp } from "fs";
import { resolve } from "path";
import puppeteer from "puppeteer";

// Unhandled promise rejection
process.on("unhandledRejection", (error) => {
  console.error(error);
  process.exit(1);
});

const articleUrlList = [
  "https://qiita.com/horikeso/items/0bf9a78454b8124a6dfa",
  "https://qiita.com/horikeso/items/f87d3e703828aa13e2ff",
  "https://qiita.com/horikeso/items/ec34a8e3d6731a94f5f9",
  "https://qiita.com/horikeso/items/bb255eede8a051dfa785",
];
(async () => {
  // setting
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--lang=ja,en-US;q=0.9,en;q=0.8",
      "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
    ],
  });

  const imgDir = resolve(__dirname, "img");
  fsp.mkdir(imgDir, { recursive: true });

  const promiseList = articleUrlList.map(async (targetUrl, index) => {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(30000); // default 30000 milliseconds, pass 0 to disable timeout
    const response = await page.goto(targetUrl);
    await page.waitForTimeout(1000); // 1秒待つ

    if (response.status() !== 200) return [];

    console.log(index);
    const fileName = resolve(imgDir, `${index}.png`);
    await page.screenshot({ path: fileName, fullPage: true });

    const results = await page.evaluate(() => {
      const title =
        document.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? "";
      return [title];
    });

    await page.close();
    return results;
  });

  let articleTitleList: string[] = [];
  await Promise.all(promiseList)
    .then((valueList) =>
      valueList.map((value: string[]) => (articleTitleList = articleTitleList.concat(value))),
    )
    .catch((reject) => {
      throw reject;
    });

  console.log(articleTitleList);

  await browser.close();
})().catch((error) => {
  console.log(error);
  process.exit(1);
});
