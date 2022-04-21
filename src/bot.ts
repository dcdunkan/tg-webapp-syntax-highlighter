import env from "./env.ts";
import { Bot, InlineKeyboard, MessageEntity } from "../deps.ts";
import { storage } from "./storage.ts";

export const bot = new Bot(env.BOT_TOKEN);

bot.command("start", async (ctx) => {
  await ctx.reply(
    `Hi there! I can syntax highlight the code blocks in your messages. \
Send a message containing a code block and see the magic!
For more information see README in the source code: \
github.com/dcdunkan/tg-webapp-syntax-highlighter

Developed by @dcdunkan from @dcbots.`,
    {
      disable_web_page_preview: true,
      reply_markup: new InlineKeyboard().webApp(
        "See example",
        env.SITE_URL +
          `?chat_id=1&message_id=1`,
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

  const code = codeEntities.map((entity) =>
    text.slice(
      entity.offset,
      entity.offset + entity.length,
    ).trim()
  );

  await storage.write(`${ctx.chat.id}.${ctx.msg.message_id}`, { code });

  await ctx.reply(
    `Found ${code.length} code ${code.length > 1 ? "blocks" : "block"}`,
    {
      reply_to_message_id: ctx.msg.message_id,
      allow_sending_without_reply: true,
      reply_markup: new InlineKeyboard()
        .webApp(
          "Preview",
          `${env.SITE_URL}?chat_id=${ctx.chat.id}&message_id=${ctx.msg.message_id}`,
        ),
    },
  );
});

bot.catch(console.error);
