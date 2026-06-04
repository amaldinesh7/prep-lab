import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { RPCHandler } from "@orpc/server/fetch";
import { modulesProcedures } from "./procedures/modules";
import { sectionsProcedures } from "./procedures/sections";
import { progressProcedures } from "./procedures/progress";

const router = {
  modules: modulesProcedures,
  sections: sectionsProcedures,
  progress: progressProcedures,
};

const handler = new RPCHandler(router);

export const app = new Hono();
app.use("*", logger());
app.use("*", cors({ origin: (origin) => origin ?? "*", credentials: true }));
app.get("/healthz", (c) => c.json({ ok: true }));
app.all("/rpc/*", async (c) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/rpc",
  });
  if (matched) return response;
  return c.notFound();
});
