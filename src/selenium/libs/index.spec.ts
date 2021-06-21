import { build } from "./index";

describe("build", () => {
  it("should export `build` function", () => {
    expect(build).not.toBeUndefined();
  });
});
