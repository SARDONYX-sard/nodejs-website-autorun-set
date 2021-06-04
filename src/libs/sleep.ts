export function sleep(ms = 5000) {
  console.log(`%c[Wait for ${ms}ms]`, "background: green; color: white");
  return new Promise((resolve) => setTimeout(resolve, ms));
}
