import { validateWebAppData } from "https://raw.githubusercontent.com/grammyjs/validator/main/src/mod.ts";
import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";

export const router = new Router();
const BOT_TOKEN = Deno.env.get("BOT_TOKEN") as string;

router.post("/check", async (ctx) => {
  const body = await ctx.request.body().value;
  const { initData } = Object.fromEntries(body);

  if (!initData) return ctx.response.status = 400;

  const isOk = validateWebAppData(BOT_TOKEN, new URLSearchParams(initData));
  if (!isOk) return ctx.response.status = 403;

  ctx.response.body = { ok: isOk, error: isOk ? null : "Invalid hash" };
});

router.get("/", async (ctx) => {
  await ctx.send({
    root: Deno.cwd(),
    path: `index.html`,
  });
});
