import { execCommand, writeFiles } from "./index";

describe("index", () => {
  it("should export `execCommand` function", () => {
    expect(execCommand).not.toBeUndefined();
  });

  it("should export `writeFiles` function", () => {
    expect(writeFiles).not.toBeUndefined();
  });
});
