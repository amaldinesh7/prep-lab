# prep-lab

Interactive frontend learning course.

## Stack

Bun monorepo · Hono + oRPC + Drizzle · React + Vite + Tanstack Router · Postgres.

## Quick start

```bash
cp .env.example .env       # adjust DATABASE_URL
bun install
bun db:generate            # generate migrations from schema
bun db:migrate             # apply migrations
bun db:seed                # seed modules + sections from packages/content
bun dev                    # api on :3001, web on :3000
```
