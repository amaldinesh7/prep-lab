import { z } from "zod";

export const sectionKindSchema = z.enum([
  "concept", "why", "pattern", "tradeoff", "gotcha",
  "reading", "mini_project", "challenge", "quiz", "cheatsheet",
]);
export type SectionKind = z.infer<typeof sectionKindSchema>;

export const sectionSummarySchema = z.object({
  id: z.string().uuid(),
  moduleId: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  kind: sectionKindSchema,
  orderIndex: z.number().int().nonnegative(),
  estMinutes: z.number().int().positive(),
});
export type SectionSummary = z.infer<typeof sectionSummarySchema>;

export const sectionResponseSchema = sectionSummarySchema.extend({
  bodyMdx: z.string().min(1),
  prevSlug: z.string().nullable(),
  nextSlug: z.string().nullable(),
});
export type SectionResponse = z.infer<typeof sectionResponseSchema>;
