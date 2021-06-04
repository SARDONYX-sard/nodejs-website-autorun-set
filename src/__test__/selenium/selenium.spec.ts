import { selenium } from "../../selenium/libs/selenium";

const urls = [
  "http://127.0.0.1:5500/src/__test__/selenium/test.html",
  "http://127.0.0.1:5500/src/__test__/selenium/test.html",
  "http://127.0.0.1:5500/src/__test__/selenium/test.html",
  "http://127.0.0.1:5500/src/__test__/selenium/test.html",
  "http://127.0.0.1:5500/src/__test__/selenium/test.html",
];

selenium(urls);
