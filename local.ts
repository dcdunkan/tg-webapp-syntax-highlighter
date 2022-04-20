import { Application } from "./deps.ts";
import { router } from "./src/router.ts";
import { bot } from "./src/bot.ts";

export const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("[server] listening...");
Promise.all([
  app.listen({ port: 8000 }),
  bot.start({
    onStart: ({ username }) => console.log(`[bot] ${username} is up`),
  }),
]);
