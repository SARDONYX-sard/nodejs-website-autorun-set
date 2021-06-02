import { selenium } from "./libs/selenium";

selenium().catch((error) => {
  console.log(error);
  process.exit(1);
});
