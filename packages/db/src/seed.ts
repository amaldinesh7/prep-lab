import { db, modules, sections } from "./index";
import { allModules } from "@prep-lab/content";
import { eq, and } from "drizzle-orm";

export async function runSeed(): Promise<void> {
  for (const m of allModules) {
    const existing = await db.select().from(modules).where(eq(modules.slug, m.slug)).limit(1);
    let moduleId: string;
    if (existing.length === 0) {
      const [inserted] = await db.insert(modules).values({
        slug: m.slug,
        track: m.track,
        orderIndex: m.orderIndex,
        title: m.title,
        summary: m.summary,
        estMinutes: m.estMinutes,
      }).returning({ id: modules.id });
      moduleId = inserted!.id;
    } else {
      moduleId = existing[0]!.id;
      await db.update(modules).set({
        track: m.track, orderIndex: m.orderIndex, title: m.title,
        summary: m.summary, estMinutes: m.estMinutes,
      }).where(eq(modules.id, moduleId));
    }

    for (const [idx, s] of m.sections.entries()) {
      const found = await db
        .select()
        .from(sections)
        .where(and(eq(sections.moduleId, moduleId), eq(sections.slug, s.slug)))
        .limit(1);
      const row = {
        moduleId,
        slug: s.slug,
        orderIndex: idx,
        kind: s.kind,
        title: s.title,
        bodyMdxPath: s.bodyMdxPath,
        estMinutes: s.estMinutes,
      };
      if (found.length === 0) await db.insert(sections).values(row);
      else await db.update(sections).set(row).where(eq(sections.id, found[0]!.id));
    }
  }
}

if (import.meta.main) {
  await runSeed();
  console.log("seed complete");
  process.exit(0);
}
