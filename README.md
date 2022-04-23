<center>

# Syntax Highlighter WebApp

</center>

Inspired by
[zubiden/tg-web-bot-demo](https://github.com/zubiden/tg-web-bot-demo).

### Try the demo bot running here: [@syntaxyybot](https://telegram.me/syntaxyybot)

Recently Telegram released a big update for bots: Web Apps/Bots. This is a
sample [Web App](https://core.telegram.org/bots/webapps) written in TypeScript
and [Deno](https://deno.land).

- [Built Using](#built-using)
- [What this bot can do?](#what-this-bot-can-do)
- [How it works](#how-it-works)
- [Setup](#setup)

> Read more about the Web Apps update
>
> - https://telegram.org/blog/notifications-bots#bot-revolution
> - https://core.telegram.org/bots/webapps

## Built using

1. [highlight.js](https://highlightjs.org) — Core part of this bot. Syntax
   highlights code elements in the WebApp. Also,
   [highlightjs-line-numbers.js](https://github.com/wcoder/highlightjs-line-numbers.js/)
   is used with highlight.js for line number support in the pre-code elements.
2. [grammY](https://grammy.dev) — The Telegram Bot framework.
3. [Oak](https://github.com/oakserver/oak) — A middleware framework for handling
   HTTP with Deno.
4. [pieroxy/lz-string](https://github.com/pieroxy/lz-string) — LZ-based
   compression algorithm for JavaScript. This bot uses some functionalities of
   this library for compressing the code block strings to URI encoded strings
   like [Prettier Playground](https://prettier.io/playground) do.

## What this bot can do?

This bot can syntax Highlight code blocks in messages. Code blocks are
considered as `pre` or multiline `code` entities. It replies with a button to
open webapp which shows you the highlighted preview.

I initially made this bot for testing the WebApp thingy. If you want to use a
stable syntax highlighting bot, see
[dcdunkan/syntax-highlighter-bot](https://github.com/dcdunkan/syntax-highlighter-bot).

> I am not gonna work on this bot much, because this bot is supposed to be used
> in developer group chats, **but** Telegram currently does not allow these
> WebApp buttons to be sent in groups. It's only for private chats. So, until
> Telegram supports it, this bot is _useless_, and it will be just a waste of
> time.

## How it works?

It's not that complicated :)

[bot.ts](src/bot.ts): Bot listens for any message containing `pre` or `code`
entity. Filters them into `pre` and multiline `code`. Then takes it's text maps
them into an array of code blocks, and [compress](src/hash.ts) it to URI encoded
string. It is appended as the URL hash. Then a web app button with that URL is
sent.

[router.ts](src/router.ts): When the web app button is clicked, —URL is opened—
router path responds with the [index.html](src/index.html) file.

[index.html](src/index.html): When this page is requested, it gets the hash from
the URL of the page, and decompresses that string back into array of code
blocks. Each string will get appended to a pre-code element. Then highlight.js
and the line number plugin will do their job.

> Additionally, when the page is requested, it also validates the data that
> Telegram sent to the page. For this bot, it's not required to do though. Maybe
> I'll just remove it later.

## Setup

- [Environment Variables](#environment-variables)
- [Deploying on Deno Deploy](#deno-deploy)
- [Running Locally](#running-locally)

### Environment Variables

- `BOT_TOKEN` - Bot token. You can get one from
  [BotFather](https://t.me/BotFather).
- `SITE_URL` - Server URL. If you're using Deno Deploy, use app's url. Or, if
  you're running locally, you may use the HTTPS forwarding URL by ngrok or
  something.

### Deno Deploy

The working demo bot, [@syntaxyybot](https://telegram.me/syntaxyybot) is running
on Deno Deploy.

[Click here to deploy bot on Deno Deploy](https://dash.deno.com/new?url=https://raw.githubusercontent.com/dcdunkan/tg-webapp-syntax-highlighter/main/mod.ts&env=BOT_TOKEN,SITE_URL).

### Running Locally

- Make sure you have [Deno CLI](https://deno.land) installed.
- Clone the repository.
  ```bash
  git clone https://github.com/dcdunkan/tg-webapp-syntax-highlighter.git
  ```
- Change directory (`cd`) to the cloned repository.
- Create a `.env` file and set [environment variables](#environment-variables)
  like in [`example.env`](example.env).
- Run the bot using the command below.
  ```bash
  deno run --allow-net --allow-env --allow-read mod.ts
  ```

  **Required permissions**
  - `--allow-net` - To communicate with Telegram servers and receive updates.
  - `--allow-env` - To access environment variables.
  - `--allow-read` - To read static files.

If everything is done correct, you should see "<samp>[server]
listening...</samp>" and "<samp>[bot] (Username) is up</samp>" in your console.

##### Node.js?

No, but _yes_. Dependencies are equally available for Node.js too. Change the
imports/exports. And in [env.ts](src/env.ts), just change the
`Deno.env.toObject()` to `process.env`. That should work.

---

[MIT License](LICENSE)
