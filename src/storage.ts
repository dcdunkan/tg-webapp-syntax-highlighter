import { DetaAdapter } from "../deps.ts";
import env from "./env.ts";

export const storage = new DetaAdapter<{ code: string[] }>({
  baseName: "messages",
  projectKey: env.DETA_KEY,
});
