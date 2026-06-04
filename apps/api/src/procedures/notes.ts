import { db, notes } from "@prep-lab/db";
import { and, eq, ilike } from "drizzle-orm";
import { base } from "../orpc";

export const notesProcedures = {
  get: base.notes.get.handler(async ({ input }) => {
    const [row] = await db.select().from(notes)
      .where(and(eq(notes.scope, input.scope), eq(notes.refId, input.refId)))
      .limit(1);
    return row ? serialise(row) : null;
  }),
  upsert: base.notes.upsert.handler(async ({ input }) => {
    const existing = await db.select().from(notes)
      .where(and(eq(notes.scope, input.scope), eq(notes.refId, input.refId)))
      .limit(1);
    if (existing.length === 0) {
      const [row] = await db.insert(notes).values({
        scope: input.scope, refId: input.refId, bodyMd: input.bodyMd,
      }).returning();
      return serialise(row!);
    }
    const [row] = await db.update(notes)
      .set({ bodyMd: input.bodyMd, updatedAt: new Date() })
      .where(eq(notes.id, existing[0]!.id))
      .returning();
    return serialise(row!);
  }),
  search: base.notes.search.handler(async ({ input }) => {
    const rows = await db.select().from(notes).where(ilike(notes.bodyMd, `%${input.q}%`));
    return rows.map(serialise);
  }),
};

function serialise(r: typeof notes.$inferSelect) {
  return { id: r.id, scope: r.scope, refId: r.refId, bodyMd: r.bodyMd, updatedAt: r.updatedAt.toISOString() };
}
