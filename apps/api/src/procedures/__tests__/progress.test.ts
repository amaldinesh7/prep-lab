import { describe, expect, it, beforeAll } from "bun:test";
import { app } from "../../server";
import { runSeed } from "@prep-lab/db";
import { db, sections } from "@prep-lab/db";

let firstSectionId: string;
beforeAll(async () => {
  await runSeed();
  const [s] = await db.select().from(sections).limit(1);
  firstSectionId = s!.id;
});

async function call(path: string, body: unknown) {
  return await app.request(`/rpc/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ json: body }),
  });
}

async function unwrap(res: Response) {
  const env = (await res.json()) as { json: unknown };
  return env.json as { status: string; timeSpentSec: number; completedAt: string | null };
}

describe("progress/upsert", () => {
  it("creates a row on first call", async () => {
    const res = await call("progress/upsert", {
      sectionId: firstSectionId,
      status: "in_progress",
    });
    expect(res.status).toBe(200);
    const body = await unwrap(res);
    expect(body.status).toBe("in_progress");
    expect(body.timeSpentSec).toBe(0);
  });
  it("accumulates time and sets completedAt when status=completed", async () => {
    await call("progress/upsert", {
      sectionId: firstSectionId,
      timeSpentDeltaSec: 60,
    });
    const res = await call("progress/upsert", {
      sectionId: firstSectionId,
      status: "completed",
    });
    const body = await unwrap(res);
    expect(body.status).toBe("completed");
    expect(body.timeSpentSec).toBeGreaterThanOrEqual(60);
    expect(body.completedAt).not.toBeNull();
  });
});
