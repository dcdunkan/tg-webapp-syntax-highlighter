import { BOT_TOKEN, SITE_URL } from "./env.ts";
import { Bot, InlineKeyboard, MessageEntity } from "../deps.ts";
import { compressToEncodedURIComponent } from "./hash.ts";

export const bot = new Bot(BOT_TOKEN);

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
        `${SITE_URL}#NoIgxg9gdgzhA2BTAdPCBzAFAHRACQEsAaAAgFkIBbAQlwEoBubKQOAJmB6dkgcUQBcSMAJ5Q+AQwAeJABYF00+HOl9EAExIAHAE6IAbgUQB3EooDWiEn1kwiHLgDMIWkpFUWARmjCmYJAlBJKRBgYMXRg5DsSAAFhUUkhIXcIAXchGNUwZL4YZmYxJC0+HBAAQRIoIxJTf3UIe0ERcQkATRklRXk+f3RaEEYQAF0gA`,
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

    // If the code entity is the full text.
    if (entity.offset === 0 && entity.length === text.length) return true;

    // Only highlight code entities if they are multiline.
    // You don't need single-lined code to be highlighted.
    const code = text.slice(entity.offset, entity.offset + entity.length);
    return code.trim().includes("\n");
  });

  const code = codeEntities.map((entity) => {
    const lines = text.slice(
      entity.offset,
      entity.offset + entity.length,
    ).trim().split("\n");

    if (lines.length === 1) return lines.join();

    // Fix padding issues, when 2nd line is empty.
    // By adding a empty unicode character (U+200E)
    if (lines[1].trim() === "") lines[1] = "‎";
    return lines.join("\n");
  });

  // Follows how prettier done this on their online Playground.
  const hash = compressToEncodedURIComponent(JSON.stringify(code));
  const url = `${SITE_URL}#${hash}`;

  await ctx.reply(
    `Found ${code.length} code ${code.length > 1 ? "blocks" : "block"}`,
    {
      reply_to_message_id: ctx.msg.message_id,
      allow_sending_without_reply: true,
      reply_markup: new InlineKeyboard()
        .webApp("Preview", url),
    },
  );
});

bot.catch(console.error);
