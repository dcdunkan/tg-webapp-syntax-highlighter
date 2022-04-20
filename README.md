<center>

# Syntax Highlighter WebApp

</center>

Based on [zubiden/tg-web-bot-demo](https://github.com/zubiden/tg-web-bot-demo).

### Try the demo bot running here: [@syntaxyybot](https://telegram.me/syntaxyybot)

Recently Telegram released a big update for bots: Web Apps. This is a sample
[WebApp](https://core.telegram.org/bots/webapps) created using
[grammY](https://grammy.dev) and [oak](https://github.com/oakserver/oak) written
in TypeScript and [Deno](https://deno.land).

- Read more about the update here:
  https://telegram.org/blog/notifications-bots#bot-revolution

- And it's API Documentation: https://core.telegram.org/bots/webapps

### What this bot can do?

Syntax Highlighting for code blocks in messages. I made this bot as an
experiment. If you want to use a stable syntax highlighting bot, see
[dcdunkan/syntax-highlighter-bot](https://github.com/dcdunkan/syntax-highlighter-bot).

### Environment Variables

Both ENV Vars are required.

- `BOT_TOKEN` - Bot token. You can get one from
  [BotFather](https://t.me/BotFather).
- `SITE_URL` - Server URL. If you're using Deno Deploy, use app's url. Or, if
  you're running locally, you may use the forwarding URL by ngrok or something.

### Deno Deploy

The working demo bot, [@syntaxyybot](https://telegram.me/syntaxyybot) is running
on Deno Deploy.

[Click here to deploy bot on Deno Deploy](https://dash.deno.com/new?url=https://raw.githubusercontent.com/dcdunkan/tg-webapp-syntax-highlighter/main/mod.ts&env=BOT_TOKEN,SITE_URL).

### Locally

- Make sure you have [Deno](https://deno.land) installed.
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

If everything is done correct, you should see "[server] listening..." and "[bot]
(Username) is up" in your console.

---

[MIT License](LICENSE)
