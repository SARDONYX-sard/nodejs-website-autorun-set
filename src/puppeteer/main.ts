import { launch } from "puppeteer";

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
  const browser = await launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--lang=ja,en-US;q=0.9,en;q=0.8",
      "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
    ],
  });

  const promiseList: Promise<any>[] = [];
  let index = 0;

  articleUrlList.forEach((targetUrl) => {
    promiseList.push(
      (async (index) => {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(30000); // default 30000 milliseconds, pass 0 to disable timeout
        const response = await page.goto(targetUrl);
        await page.waitForTimeout(1000); // 1秒待つ

        if (response.status() !== 200) {
          return [];
        }

        console.log(index);
        const fileName = "src/puppeteer/img/" + index + ".png";
        await page.screenshot({ path: fileName, fullPage: true });
        let title: string;

        const result = await page.evaluate(() => {
          const $meta = document.querySelector('meta[property="og:title"]');
          if ($meta instanceof Element) {
            title = $meta.getAttribute("content") ?? "";
          }
          return [title];
        });

        await page.close();
        return result;
      })(index),
    );
    index++;
  });

  let articleTitleList: string[] = [];
  await Promise.all(promiseList)
    .then((valueList) => {
      valueList.forEach((value: string) => {
        articleTitleList = articleTitleList.concat(value);
      });
    })
    .catch((reject) => {
      throw reject;
    });

  console.log(articleTitleList);

  await browser.close();
})().catch((error) => {
  console.log(error);
  process.exit(1);
});
