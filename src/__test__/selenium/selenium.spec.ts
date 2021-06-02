import { selenium } from "../../selenium/libs/selenium";

const urls = [
  "http://127.0.0.1:5500/src/__test__/selenium/test.html",
  "http://127.0.0.1:5500/src/__test__/selenium/test.html",
  "http://127.0.0.1:5500/src/__test__/selenium/test.html",
  "http://127.0.0.1:5500/src/__test__/selenium/test.html",
  "http://127.0.0.1:5500/src/__test__/selenium/test.html",
];

// test("selenium function test", () => {
//   expect(() => selenium(urls)).resolves();

//   expect(() => selenium(urls)).toThrow(Error);
// });

selenium(urls);
