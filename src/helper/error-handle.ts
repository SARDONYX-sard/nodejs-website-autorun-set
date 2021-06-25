import chalk from "chalk";

// handle promise rejection
process.on("unhandledRejection", (error, promise) => {
  console.error(chalk`Error: {red ERR!} ${error}`);
  console.error(chalk`promise: {red ERR!} ${promise}`);
  process.exit(1);
});
