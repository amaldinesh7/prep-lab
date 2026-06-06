// Vercel serverless entry that proxies HTTP requests to the Hono app
// living in `apps/api/src/server.ts`.
//
// Why this file exists:
// - Vercel auto-discovers serverless functions from `/api/*.ts` at the
//   project root. The `[[...path]].ts` catchall captures everything under
//   `/api/...`, including `/api/rpc/*` (the oRPC mount) and `/api/healthz`.
// - The web client builds its base URL from `VITE_API_URL`. In production
//   on Vercel, set `VITE_API_URL=/api` so requests land here.
// - Hono is already mounted at the root (`/rpc/*`, `/healthz`), so we strip
//   the `/api` prefix from the incoming URL before handing it to `app.fetch`.
//
// Runtime: Node (the API uses `postgres` over TCP and drizzle-orm/postgres-js,
// neither of which work on the Edge runtime).

import { app } from "../apps/api/src/server";

export const config = { runtime: "nodejs22.x" };

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  url.pathname = url.pathname.replace(/^\/api(?=\/|$)/, "") || "/";
  return app.fetch(new Request(url.toString(), req));
}
