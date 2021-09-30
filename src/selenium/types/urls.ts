import { ThenableWebDriver } from "selenium-webdriver";

export type ScrapingKit<T, U> = {
  domain?: string;
  url?: string;
  getElement1: (driver: ThenableWebDriver) => Promise<T>;
  getElement2: (driver: ThenableWebDriver) => Promise<U>;
  driver: ThenableWebDriver;
};

export type ScrapingFunc<T, U> = (content: ScrapingKit<T, U>) => Promise<string | undefined>;

export type ScrapingContent = {
  url: string;
  sleepMs: number;
  writeLogPath: string;
  buildOptions: string[];
};
