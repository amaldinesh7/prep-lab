import { db, modules, sections } from "@prep-lab/db";
import { eq, asc } from "drizzle-orm";
import { ORPCError } from "@orpc/server";
import { loadSectionBody, loadQuizForBodyPath } from "@prep-lab/content";
import { base } from "../orpc";

export const sectionsProcedures = {
  get: base.sections.get.handler(async ({ input }) => {
    const [m] = await db
      .select()
      .from(modules)
      .where(eq(modules.slug, input.moduleSlug))
      .limit(1);
    if (!m) throw new ORPCError("NOT_FOUND", { message: `module not found: ${input.moduleSlug}` });
    const all = await db
      .select()
      .from(sections)
      .where(eq(sections.moduleId, m.id))
      .orderBy(asc(sections.orderIndex));
    const idx = all.findIndex((s) => s.slug === input.sectionSlug);
    if (idx === -1) throw new ORPCError("NOT_FOUND", { message: `section not found: ${input.sectionSlug}` });
    const s = all[idx]!;
    const bodyMdx = await loadSectionBody(s.bodyMdxPath);
    const quizManifest = await loadQuizForBodyPath(s.bodyMdxPath);
    const quiz = quizManifest
      ? {
          questions: quizManifest.questions.map((q) => ({
            id: q.id,
            prompt: q.prompt,
            options: q.options,
          })),
        }
      : null;
    return {
      id: s.id,
      moduleId: s.moduleId,
      slug: s.slug,
      title: s.title,
      kind: s.kind,
      orderIndex: s.orderIndex,
      estMinutes: s.estMinutes,
      bodyMdx,
      prevSlug: all[idx - 1]?.slug ?? null,
      nextSlug: all[idx + 1]?.slug ?? null,
      quiz,
    };
  }),
};
