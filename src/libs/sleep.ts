export function sleep(ms: number) {
  console.log(`%c[Wait for ${ms}ms]`, "background: green; color: white");
  return new Promise((resolve) => setTimeout(resolve, ms));
}
