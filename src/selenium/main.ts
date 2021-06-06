import { Manga } from "./custom/custom-selenium";
import { echoError } from "./libs";
// import { loopTab } from "./libs";

// (async () => {
//   await loopTab()();
// })().catch(echoError);

(async () => {
  const options = {
    args: ["--headless", "--disable-gpu", "--window-size=1024,768"],
    w3c: false,
  };

  await (await Manga.init(options)).loopUrl();
})().catch(echoError);
