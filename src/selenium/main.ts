import { Manga } from "./custom/custom-selenium";
// import { loopTab } from "./libs";

// loopTab().catch((error) => {
//   console.log(error);
//   process.exit(1);
// });

(async () => {
  const manga = await Manga.init({
    args: ["--headless", "--disable-gpu", "--window-size=1024,768"],
    w3c: false,
  });

  await manga.loopUrl();
})().catch((error) => {
  console.log(error);
  process.exit(1);
});
