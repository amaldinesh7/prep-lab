# prep-lab

A calm, scholarly study platform for frontend topics — modules of MDX
sections (concept · why · pattern · gotcha · tradeoff · exemplar · quiz),
with progress tracking and inline notes.

## Stack

Bun monorepo · Hono + oRPC + Drizzle · React + Vite + TanStack Router · Postgres.

## Quick start

```bash
cp .env.example .env       # adjust DATABASE_URL
docker compose up -d       # local Postgres on :5432
bun install
bun db:generate            # generate migrations from schema
bun db:migrate             # apply migrations
bun db:seed                # seed modules + sections from packages/content
bun dev                    # api on :3001, web on :3000
```

## Deploy

Free-forever stack (Vercel for web + API, Neon for Postgres). See
[DEPLOY.md](./DEPLOY.md) for the step-by-step.
