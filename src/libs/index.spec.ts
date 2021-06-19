import { execCommand } from "./index";

describe("execCommand", () => {
  it("should export `execCommand` function", () => {
    expect(execCommand).not.toBeUndefined();
  });
});
