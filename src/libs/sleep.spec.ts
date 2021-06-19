import { sleep } from "./sleep";

jest.useFakeTimers();
describe("sleep", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should be return Promise<unknown>", async () => {
    const promise = sleep(1000);
    jest.advanceTimersByTime(1000);
    expect(typeof (await promise)).toBe("undefined");
  });
});
