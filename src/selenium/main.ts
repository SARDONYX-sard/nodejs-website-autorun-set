import { getDateFromGoogle } from "./libs";
import { echoError } from "./../libs/command";

// sample
getDateFromGoogle("https://www.google.com/search?q=today+date&gl=us&hl=en&pws=0&gws_rd=cr").catch(
  echoError,
);
