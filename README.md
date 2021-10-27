<h1 align="center">Auto open urls</h1>

<div align="center">
<a href="https://opensource.org/licenses/MIT"><img alt="GitHub" src="https://img.shields.io/github/license/SARDONYX-sard/nodejs-website-autorun-set"></a>
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
- [Reference sites](#reference-sites)
- [License](#license)

<!-- /TOC -->

## What is that ?

This is the Program of Puppeteer & Selenium running on Node.js.

The Selenium program allows you to open pre-specified URLs in sequence.

## Quick Start

### Requirements

- npm or Yarn
- Node.js 12.17 or higher
- Chrome 91

## Installation

1. Clone this repository.

```sh
git clone https://github.com/SARDONYX-sard/nodejs-website-autorun-set.git
```

2. Run command the following command.

```sh
npm install
```

If you are using Yarn, use the following command.

```sh
yarn install
```

## Usage

### Selenium

```sh
npm run selenium-sample
```

If you are using Yarn, use the following command.

```sh
yarn run selenium-sample
```

### Puppeteer

```sh
npm run puppeteer
```

If you are using Yarn, use the following command.

```sh
yarn run puppeteer
```

### Test

Run command the following command.

```sh
npm run test
# or
npm run jest --coverage
```

If you are using Yarn, use the following command.

```sh
yarn run test
```

## Reference sites

[selenium-webdriver Doc](https://seleniumhq.github.io/selenium/docs/api/javascript/index.html)

[「Node.jsでブラウザを自動操作してみよう」の感想・備忘録2](https://ageo-soft.info/books/programming_books/javascript_books/213/#Explicit_Wait)

[Selenium Nodejs CHROMEDRIVER path](https://qiita.com/tonio0720/items/70c13ad304154d95e4bc)

[Nodejsを使ってSeleniumでChromeを動かす](https://stackoverflow.com/questions/26191142/selenium-nodejs-chromedriver-path)

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Copyright 2021 SARDONYX. All rights reserved.
