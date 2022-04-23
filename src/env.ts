import { cleanEnv, config, str } from "../deps.ts";
await config({ export: true });

export const {
  BOT_TOKEN,
  SITE_URL,
} = cleanEnv(Deno.env.toObject(), {
  BOT_TOKEN: str(),
  SITE_URL: str(),
});
