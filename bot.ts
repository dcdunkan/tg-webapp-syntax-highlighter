import { config } from "https://deno.land/std@0.135.0/dotenv/mod.ts";
await config({ export: true });

import { Bot, InlineKeyboard } from "https://deno.land/x/grammy@v1.8.0/mod.ts";
import { MessageEntity } from "https://cdn.esm.sh/v77/@grammyjs/types@2.7.0/index";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN") as string;
const SITE_URL = Deno.env.get("SITE_URL") as string;

export const bot = new Bot(BOT_TOKEN);

bot.command("start", async (ctx) => {
  await ctx.reply(
"Hi there! I can syntax highlight the code blocks in your messages.\
\nWhat is special about me? Send a message containing a code block. By @dcbots.\
\nSource code: github.com/dcdunkan/tg-webapp-syntax-highlighter",
    {
      reply_markup: new InlineKeyboard().webApp(
        "See example",
        SITE_URL +
          `?code=${encodeURIComponent('["console.log(\\"Hello, world!\\")"]')}`,
      ),
    },
  );
});

bot.on(["::pre", "::code"], async (ctx) => {
  let text: string;
  if (ctx.msg.text) text = ctx.msg.text;
  else if (ctx.msg.caption) text = ctx.msg.caption;
  else return;

  let entities: MessageEntity[];
  if (ctx.msg.entities) entities = ctx.msg.entities;
  else if (ctx.msg.caption_entities) entities = ctx.msg.caption_entities;
  else return;

  const codeEntities = entities.filter((entity) => {
    if (entity.type === "pre") return true;
    if (entity.type !== "code") return;
    if (entity.offset === 0 && entity.length === text.length) return true;
    const code = text.slice(entity.offset, entity.offset + entity.length);
    return code.trim().includes("\n");
  });

  const toHighlight = codeEntities.map((entity) =>
    text.slice(
      entity.offset,
      entity.offset + entity.length,
    ).trim()
  );

  await ctx.reply("Highlighted code:", {
    reply_markup: new InlineKeyboard().webApp(
      "View",
      SITE_URL + "?code=" + encodeURIComponent(JSON.stringify(toHighlight)),
    ),
  });
});

bot.catch(console.error);
