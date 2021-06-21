import { echoError, execCommand, execute } from "./command";

describe("command", () => {
  // afterAll(() => {});

  context("when the string is given", () => {
    it("should return false", async () => {
      try {
        expect(execCommand("echo Test", /[^(-{1})](-{2})?echo/)).toBeFalsy();

        // error catch
      } catch (error) {
        return expect(error).toMatch("error");
      }
    });

    it("should return true", async () => {
      try {
        expect(execCommand("echo Test", /[^(-{1})](-{2})?echo/)).toBeFalsy();
        expect(execute("echo Test")).toBeTruthy();

        // error catch
      } catch (error) {
        return expect(error).toMatch("error");
      }
    });
  });

  context("when the error is thrown", () => {
    it("should be executed `echoError`", async () => {
      try {
        Promise.reject(new Error("Test Error"));
        // error catch
      } catch (error) {
        expect(echoError(error, true)).rejects.toThrowError("Test Error");
      }
    });
  });
});
