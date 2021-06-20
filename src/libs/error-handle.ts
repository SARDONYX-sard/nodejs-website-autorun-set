import chalk from "chalk";

// handle promise rejection
process.on("unhandledRejection", (error) => {
  console.error(chalk`promise {red ERR!} ${error}`);
  process.exit(1);
});
