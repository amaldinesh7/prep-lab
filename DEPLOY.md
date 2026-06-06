# Deploy

This project is configured to deploy as a **single Vercel project** that
serves both the Vite SPA and the Hono API as a Node serverless function,
backed by a free **Neon** Postgres database.

| Surface | Host | Cost |
|---|---|---|
| Web (Vite SPA) | Vercel static | Free forever (Hobby) |
| API (Hono + oRPC) | Vercel Node serverless function | Free forever (Hobby) |
| Postgres | Neon free tier | Free forever (0.5 GB) |

The whole stack lives on `git push` once it's wired up.

## One-time setup (~5 minutes)

### 1. Provision Postgres on Neon

1. Sign up at [neon.tech](https://neon.tech) (GitHub login, no card).
2. Create a new project. Region: pick the one closest to your Vercel region
   (Vercel defaults to `iad1` = US East, so Neon `us-east-2` is a good pair).
3. From the project dashboard, copy the **pooled** connection string. It
   looks like:
   ```
   postgres://USER:PASSWORD@ep-xxxxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
   The pooled endpoint (`-pooler` in the host) is important for serverless
   functions — it lets short-lived invocations reuse a backend connection
   pool instead of spinning up new Postgres backends per request.

### 2. Run migrations + seed against Neon (from your laptop)

```bash
export DATABASE_URL='<paste the Neon pooled URL>'
bun install
bun run --filter @prep-lab/db migrate
bun run --filter @prep-lab/db seed
```

The seed reads every MDX file under `packages/content/src/modules/**` and
populates `modules` and `sections`. Run it once per environment.

### 3. Link the repo to Vercel

```bash
npx vercel login        # opens browser, ~10s
npx vercel link         # pick "create new project", accept defaults
```

This writes a `.vercel/project.json` (gitignored) that ties this working
copy to a Vercel project.

### 4. Set production env vars

```bash
# API → DB
npx vercel env add DATABASE_URL production
# Paste the same Neon pooled URL.

# Web → API base path (same-origin via Vercel's `/api/*` function)
npx vercel env add VITE_API_URL production
# Type: /api
```

### 5. Ship it

```bash
npx vercel --prod
```

You'll get a `https://prep-lab-*.vercel.app` URL on completion. Every
subsequent `git push` to `master` will trigger a fresh production deploy
automatically (once you connect the GitHub repo in Vercel's dashboard, which
the `vercel link` step offers to do for you).

## How the deploy wiring works

- **`vercel.json`** at the repo root tells Vercel:
  - install with `bun install` (workspace-aware)
  - build the web SPA via `bun run --filter @prep-lab/web build`
  - serve static output from `apps/web/dist`
  - rewrite all non-`/api/` paths to `/index.html` so TanStack Router's
    client-side routes resolve on hard refresh
  - bundle `packages/content/src/modules/**` alongside the function so
    `loadSectionBody` can read MDX at request time
- **`api/[[...path]].ts`** is a Vercel catchall function. It strips the
  `/api` URL prefix and forwards everything to the existing Hono app
  (`apps/api/src/server.ts`) via `app.fetch`. No changes to procedures, no
  duplicated routes.
- **Web client** (`apps/web/src/lib/orpc.ts`) constructs request URLs as
  `${VITE_API_URL}/rpc/...`. With `VITE_API_URL=/api` in production, the
  browser sends `/api/rpc/...` to the same origin, the function handles it,
  no CORS preflight, no cross-origin cookie weirdness.

## Local development is unchanged

```bash
docker compose up -d              # Postgres on :5432
bun install
bun run --filter @prep-lab/db migrate
bun run --filter @prep-lab/db seed
bun run --filter @prep-lab/api dev    # Bun, :3001
bun run --filter @prep-lab/web dev    # Vite, :3000
```

`VITE_API_URL` is unset locally, so the web client falls back to
`http://localhost:3001` (see `apps/web/src/lib/orpc.ts`).

## Why this stack and not the alternatives

| Option | Verdict | Reason |
|---|---|---|
| **Vercel + Neon** | ✅ Picked | Both free forever, single dashboard, zero code changes to the API. |
| Render free tier | ❌ | Web sleeps after 15 min idle; free Postgres is gone (90-day cap since 2024). |
| Railway | ❌ | Only a one-time $5 trial credit; not free forever. |
| Fly.io | ❌ | Free allowance was removed for new accounts. |
| Cloudflare Pages + Workers + Neon HTTP | Viable | Most generous free tier, but requires swapping `postgres` for `@neondatabase/serverless` and adapting the Drizzle adapter (`drizzle-orm/postgres-js` → `drizzle-orm/neon-http`). ~45 min of churn for marginal upside on a personal study app. |
| Supabase | Viable | Free Postgres pauses after 1 week of inactivity, which is annoying for a low-traffic personal site. |

## Quotas to keep an eye on (Vercel Hobby + Neon Free)

- Vercel: 100 GB bandwidth / month, 100 GB-hours function execution.
- Neon: 0.5 GB storage, 191.9 compute hours / month (always-on possible
  on one branch).
- Both reset monthly. For a personal study tracker this is laughably
  generous — you'll never hit these.
