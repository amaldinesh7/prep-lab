import { describe, expect, it, beforeAll } from "bun:test";
import { app } from "../../server";
import { runSeed, db, sections } from "@prep-lab/db";

let sectionId: string;
beforeAll(async () => {
  await runSeed();
  const [s] = await db.select().from(sections).limit(1);
  sectionId = s!.id;
});

async function call(path: string, body: unknown) {
  return await app.request(`/rpc/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ json: body }),
  });
}
async function unwrap(res: Response) {
  const env = (await res.json()) as { json: any };
  return env.json;
}

describe("notes", () => {
  it("upserts and reads back", async () => {
    const up = await unwrap(await call("notes/upsert", { scope: "section", refId: sectionId, bodyMd: "hello" }));
    expect(up.bodyMd).toBe("hello");
    const got = await unwrap(await call("notes/get", { scope: "section", refId: sectionId }));
    expect(got.bodyMd).toBe("hello");
  });
  it("search returns notes containing the query", async () => {
    await call("notes/upsert", { scope: "section", refId: sectionId, bodyMd: "needle in haystack" });
    const res = await unwrap(await call("notes/search", { q: "needle" }));
    expect(res.some((n: any) => n.bodyMd.includes("needle"))).toBe(true);
  });
});
