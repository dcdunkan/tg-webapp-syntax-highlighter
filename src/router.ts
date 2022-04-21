import env from "./env.ts";
import { Router, validateWebAppData } from "../deps.ts";
import { storage } from "./storage.ts";

export const router = new Router();

router.post("/check", async (ctx) => {
  const body = await ctx.request.body().value;
  const { initData } = body;

  if (!initData) return ctx.response.status = 400;

  const isOk = validateWebAppData(env.BOT_TOKEN, new URLSearchParams(initData));
  if (!isOk) return ctx.response.status = 403;

  ctx.response.body = { ok: isOk, error: isOk ? null : "Invalid hash" };
});

router.get("/", async (ctx) => {
  await ctx.send({
    root: `${Deno.cwd()}/src`,
    path: `index.html`,
  });
});

router.get("/getCode/:chat_id/:message_id", async (ctx) => {
  const { chat_id, message_id } = ctx.params;
  const data = await storage.read(chat_id + "." + message_id);
  if (!data) {
    ctx.response.body = { ok: false };
  } else {
    ctx.response.status = 200;
    ctx.response.body = { ok: true, ...data };
  }
});
