import { Manga } from "./custom/custom-selenium";
// common libs
import { echoError } from "../libs";

(async () => {
  const options = {
    args: ["--headless", "--disable-gpu", "--window-size=1024,768"],
    w3c: false,
  };

  await (await Manga.init(options)).loopUrl();
})().catch(echoError);
