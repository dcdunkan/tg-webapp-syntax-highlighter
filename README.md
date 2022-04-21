<center>

# Syntax Highlighter WebApp

</center>

Inspired by
[zubiden/tg-web-bot-demo](https://github.com/zubiden/tg-web-bot-demo).

### Try the demo bot running here: [@syntaxyybot](https://telegram.me/syntaxyybot)

Recently Telegram released a big update for bots: Web Apps/Bots. This is a
sample [WebApp](https://core.telegram.org/bots/webapps) created using
[grammY](https://grammy.dev) and [oak](https://github.com/oakserver/oak) written
in TypeScript and [Deno](https://deno.land).

> Read more about the update
>
> - https://telegram.org/blog/notifications-bots#bot-revolution
> - https://core.telegram.org/bots/webapps

### What this bot can do?

This bot can syntax Highlight code blocks in messages. Code blocks are
considered as `pre` or multiline `code` entities. It replies with a button to
open webapp which shows you the highlighted preview.

I initially made this bot for testing the WebApp thingy. If you want to use a
stable syntax highlighting bot, see
[dcdunkan/syntax-highlighter-bot](https://github.com/dcdunkan/syntax-highlighter-bot).

I am not gonna work on this bot much, because this bot is supposed to be used in
developer group chats, **but** Telegram currently does not allow these WebApp
buttons to be sent in groups. It's only for private chats. So, until Telegram
supports it, this bot is not very useful, and it will be just a waste of time.

### Environment Variables

- `BOT_TOKEN` - Bot token. You can get one from
  [BotFather](https://t.me/BotFather).
- `SITE_URL` - Server URL. If you're using Deno Deploy, use app's url. Or, if
  you're running locally, you may use the forwarding URL by ngrok or something.
- `DETA_KEY` - https://deta.sh project key. Create a project and use the shown
  project key.

  Why? The initial version of this bot, passed the text to highlight as a query
  parameter, which lead to many errors. One of them being lengthy code. I am not
  very experienced in web development and I don't know much about client <-->
  server things. So I thought about using databases. Storage is an issue. But
  since Deta provides _unlimited storage_, I'm using it. Once the data is gone,
  it's GONE, I know. But, I don't really know any better alternative way yet. If
  you do, please consider opening a PR.

### Deno Deploy

The working demo bot, [@syntaxyybot](https://telegram.me/syntaxyybot) is running
on Deno Deploy.

[Click here to deploy bot on Deno Deploy](https://dash.deno.com/new?url=https://raw.githubusercontent.com/dcdunkan/tg-webapp-syntax-highlighter/main/mod.ts&env=BOT_TOKEN,SITE_URL).

### Locally

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

---

[MIT License](LICENSE)
