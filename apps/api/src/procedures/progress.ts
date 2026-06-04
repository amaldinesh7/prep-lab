import { db, progress, sections, modules } from "@prep-lab/db";
import { eq, sql, desc, count } from "drizzle-orm";
import { base } from "../orpc";

export const progressProcedures = {
  upsert: base.progress.upsert.handler(async ({ input }) => {
    const now = new Date();
    const existing = await db
      .select()
      .from(progress)
      .where(eq(progress.sectionId, input.sectionId))
      .limit(1);
    if (existing.length === 0) {
      const [row] = await db
        .insert(progress)
        .values({
          sectionId: input.sectionId,
          status: input.status ?? "in_progress",
          timeSpentSec: input.timeSpentDeltaSec ?? 0,
          lastVisitedAt: now,
          completedAt: input.status === "completed" ? now : null,
        })
        .returning();
      return serialise(row!);
    }
    const cur = existing[0]!;
    const nextStatus = input.status ?? cur.status;
    const [row] = await db
      .update(progress)
      .set({
        status: nextStatus,
        timeSpentSec: cur.timeSpentSec + (input.timeSpentDeltaSec ?? 0),
        lastVisitedAt: now,
        completedAt: nextStatus === "completed" ? (cur.completedAt ?? now) : null,
      })
      .where(eq(progress.sectionId, input.sectionId))
      .returning();
    return serialise(row!);
  }),

  summary: base.progress.summary.handler(async () => {
    const [totals] = await db
      .select({
        total: count(sections.id),
        completed: sql<number>`count(${progress.completedAt})::int`,
        time: sql<number>`coalesce(sum(${progress.timeSpentSec}), 0)::int`,
      })
      .from(sections)
      .leftJoin(progress, eq(progress.sectionId, sections.id));

    const last = await db
      .select({
        sectionSlug: sections.slug,
        moduleSlug: modules.slug,
        at: progress.lastVisitedAt,
      })
      .from(progress)
      .innerJoin(sections, eq(sections.id, progress.sectionId))
      .innerJoin(modules, eq(modules.id, sections.moduleId))
      .where(sql`${progress.lastVisitedAt} is not null`)
      .orderBy(desc(progress.lastVisitedAt))
      .limit(1);

    return {
      totalSections: totals?.total ?? 0,
      completedSections: totals?.completed ?? 0,
      timeSpentSec: totals?.time ?? 0,
      lastVisited: last[0]
        ? {
            moduleSlug: last[0].moduleSlug,
            sectionSlug: last[0].sectionSlug,
            at: last[0].at!.toISOString(),
          }
        : null,
    };
  }),
};

function serialise(row: typeof progress.$inferSelect) {
  return {
    sectionId: row.sectionId,
    status: row.status,
    timeSpentSec: row.timeSpentSec,
    lastVisitedAt: row.lastVisitedAt?.toISOString() ?? null,
    completedAt: row.completedAt?.toISOString() ?? null,
  };
}
