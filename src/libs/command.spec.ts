import { echoError, execCommand, execute } from "./command";

describe("command", () => {
  context("echoError", () => {
    it("should export `echoError` function", () => {
      expect(echoError).not.toBeUndefined();
    });
  });

  context("execCommand", () => {
    it("should export `execCommand` function", () => {
      expect(execCommand).not.toBeUndefined();
    });
  });

  context("execute", () => {
    it("should export `execute` function", () => {
      expect(execute).not.toBeUndefined();
    });
  });
});
