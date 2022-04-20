import { Application } from "https://deno.land/x/oak@v10.5.1/application.ts";
import { router } from "./server.ts";
import { bot } from "./bot.ts";

const SITE_URL = Deno.env.get("SITE_URL") as string;

router.post("/", async (ctx) => {
  await bot.init();
  const value = await ctx.request.body().value;
  await bot.handleUpdate(value);
  ctx.response.status = 200;
});

if ((await bot.api.getWebhookInfo()).url === "") {
  await bot.api.setWebhook(SITE_URL);
}

export const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("[server] listening...");
await app.listen({ port: 8000 });
