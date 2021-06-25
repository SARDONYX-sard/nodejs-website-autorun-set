import { build, default_urls, switchNewTab } from "./index";

describe("index", () => {
  it("should export `build` function", () => {
    expect(build).not.toBeUndefined();
  });

  it("should export `switchNewTab` function", () => {
    expect(switchNewTab).not.toBeUndefined();
  });

  it("should export `default_urls` function", () => {
    expect(default_urls).not.toBeUndefined();
  });
});
