import { BOT_TOKEN } from "./env.ts";
import { Router, validateWebAppData } from "../deps.ts";

export const router = new Router();

router.get("/", async (ctx) => {
  await ctx.send({
    root: "src",
    path: "index.html",
  });
});

// initData validation
router.post("/check", async (ctx) => {
  const body = await ctx.request.body().value;
  const { initData } = body;

  if (!initData) return ctx.response.status = 400;

  const isOk = validateWebAppData(BOT_TOKEN, new URLSearchParams(initData));
  if (!isOk) return ctx.response.status = 403;

  ctx.response.body = { ok: isOk, error: isOk ? null : "Invalid hash" };
});
