import { describe, expect, it, beforeEach } from "bun:test";
import { db, modules, sections } from "..";
import { runSeed } from "../seed";
import { eq } from "drizzle-orm";

describe("runSeed", () => {
  beforeEach(async () => {
    await db.delete(sections);
    await db.delete(modules);
  });

  it("inserts modules and sections from the content manifest", async () => {
    await runSeed();
    const mods = await db.select().from(modules);
    expect(mods.length).toBeGreaterThan(0);
    const tr = mods.find((m) => m.slug === "tanstack-router");
    expect(tr).toBeDefined();
    const secs = await db.select().from(sections).where(eq(sections.moduleId, tr!.id));
    expect(secs.length).toBeGreaterThan(0);
  });

  it("is idempotent — re-running does not duplicate", async () => {
    await runSeed();
    const before = await db.select().from(sections);
    await runSeed();
    const after = await db.select().from(sections);
    expect(after.length).toBe(before.length);
  });
});
