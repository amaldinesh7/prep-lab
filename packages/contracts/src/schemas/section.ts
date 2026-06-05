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

export const quizQuestionUISchema = z.object({
  id: z.string(),
  prompt: z.string(),
  options: z.array(z.object({ id: z.string(), label: z.string() })),
});
export type QuizQuestionUI = z.infer<typeof quizQuestionUISchema>;

export const sectionResponseSchema = sectionSummarySchema.extend({
  bodyMdx: z.string().min(1),
  prevSlug: z.string().nullable(),
  nextSlug: z.string().nullable(),
  quiz: z.object({ questions: z.array(quizQuestionUISchema) }).nullable(),
});
export type SectionResponse = z.infer<typeof sectionResponseSchema>;
