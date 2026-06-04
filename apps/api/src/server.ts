import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

export const app = new Hono();
app.use("*", logger());
app.use("*", cors({ origin: (origin) => origin ?? "*", credentials: true }));
app.get("/healthz", (c) => c.json({ ok: true }));
