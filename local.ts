import { Application } from "https://deno.land/x/oak@v10.5.1/application.ts";
import { router } from "./server.ts";
import { bot } from "./bot.ts";

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
