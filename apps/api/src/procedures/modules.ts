import { db, modules, sections, progress } from "@prep-lab/db";
import { eq, asc, sql } from "drizzle-orm";
import { base } from "../orpc";

export const modulesProcedures = {
  list: base.modules.list.handler(async () => {
    const rows = await db
      .select({
        id: modules.id,
        slug: modules.slug,
        track: modules.track,
        orderIndex: modules.orderIndex,
        title: modules.title,
        summary: modules.summary,
        estMinutes: modules.estMinutes,
        totalSections: sql<number>`count(${sections.id})::int`,
        completedSections: sql<number>`count(${progress.completedAt})::int`,
      })
      .from(modules)
      .leftJoin(sections, eq(sections.moduleId, modules.id))
      .leftJoin(progress, eq(progress.sectionId, sections.id))
      .groupBy(modules.id)
      .orderBy(asc(modules.orderIndex));
    return rows;
  }),
  get: base.modules.get.handler(async ({ input }) => {
    const [m] = await db
      .select()
      .from(modules)
      .where(eq(modules.slug, input.slug))
      .limit(1);
    if (!m) throw new Error(`module not found: ${input.slug}`);
    const secs = await db
      .select({
        id: sections.id,
        moduleId: sections.moduleId,
        slug: sections.slug,
        title: sections.title,
        kind: sections.kind,
        orderIndex: sections.orderIndex,
        estMinutes: sections.estMinutes,
      })
      .from(sections)
      .where(eq(sections.moduleId, m.id))
      .orderBy(asc(sections.orderIndex));
    return { ...m, sections: secs };
  }),
};
