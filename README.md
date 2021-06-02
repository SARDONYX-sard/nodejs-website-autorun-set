<h1 align="center">Auto open urls</h1>

<div align="center">
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/github/license/jagaapple/next-typed-routes.svg" alt="license"></a>
</div>

## Table of Contents

<!-- TOC depthFrom:2 -->

- [Table of Contents](#table-of-contents)
- [What is that ?](#what-is-that-)
- [Quick Start](#quick-start)
  - [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Selenium](#selenium)
  - [Puppeteer](#puppeteer)
  - [Test](#test)
- [Customize Selenium](#customize-selenium)
- [Reference sites](#reference-sites)
- [License](#license)

<!-- /TOC -->


## What is that ?

This is the Program of Puppeteer & selenium running on Node.js.
The Selenium program allows you to open pre-specified URLs in sequence.

## Quick Start

### Requirements

* npm or Yarn
* Node.js 10.0.0 or higher
* [VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)(if you want to do test)

## Installation

1. Clone this repository.

```sh
$ git clone https://github.com/SARDONYX-sard/nodejs-website-autorun-set.git
```

2. Run command the following command.

```sh
$ npm install
```

If you are using Yarn, use the following command.

```sh
$ yarn install
```

3. Please create a file named `urls.ts` in `src/selenium/libs/`
   and write

- example
src/selenium/libs/urls.ts
```javascript
export const default_urls = [
  "https://www.google.com/",
  "https://www.google.com/",
  "https://www.google.com/",
  "https://www.google.com/",
  "https://www.google.com/",
  "https://www.google.com/"
];
```


## Usage

### Selenium

```sh
$ npx selenium
```

If you are using Yarn, use the following command.

```sh
$ yarn run selenium
```

### Puppeteer

```sh
$ npx puppeteer
```

If you are using Yarn, use the following command.

```sh
$ yarn run puppeteer
```

### Test

1. Open the file in the following path & start LiveServer.

```sh
src/__test__/selenium/test.html
```

2. Run command the following command.

```sh
$ npx test
```

If you are using Yarn, use the following command.

```sh
$ yarn run test
```

## Customize Selenium

* If you want to customize the selenium acution,

  you create the following file.

Example:
src/selenium/libs/urls.ts
```javascript
export const default_urls = [
  "URL",
  "URL",
  "URL",
  "URL",
  "URL",
  "URL",
];
```

## Reference sites

[selenium-webdriver Doc](https://seleniumhq.github.io/selenium/docs/api/javascript/index.html)

[「Node.jsでブラウザを自動操作してみよう」の感想・備忘録2](https://ageo-soft.info/books/programming_books/javascript_books/213/#Explicit_Wait)

[Selenium Nodejs CHROMEDRIVER path](https://qiita.com/tonio0720/items/70c13ad304154d95e4bc)

[Nodejsを使ってSeleniumでChromeを動かす](https://stackoverflow.com/questions/26191142/selenium-nodejs-chromedriver-path)

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Copyright 2021 SARDONYX. All rights reserved.
