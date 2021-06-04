import { loopTab } from "./libs/index";
import { custom_urls } from "./custom-urls";

loopTab(custom_urls).catch((error) => {
  console.log(error);
  process.exit(1);
});
