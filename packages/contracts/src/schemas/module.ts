import { z } from "zod";

export const trackSchema = z.enum(["frontend"]);

export const moduleSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  track: trackSchema,
  orderIndex: z.number().int().nonnegative(),
  title: z.string(),
  summary: z.string(),
  estMinutes: z.number().int().positive(),
});
export type Module = z.infer<typeof moduleSchema>;

export const moduleWithProgressSchema = moduleSchema.extend({
  completedSections: z.number().int().nonnegative(),
  totalSections: z.number().int().nonnegative(),
});
export type ModuleWithProgress = z.infer<typeof moduleWithProgressSchema>;
