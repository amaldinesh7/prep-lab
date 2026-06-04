import { z } from "zod";

export const progressStatusSchema = z.enum(["not_started", "in_progress", "completed"]);
export type ProgressStatus = z.infer<typeof progressStatusSchema>;

export const progressRowSchema = z.object({
  sectionId: z.string().uuid(),
  status: progressStatusSchema,
  timeSpentSec: z.number().int().nonnegative(),
  lastVisitedAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
});
export type ProgressRow = z.infer<typeof progressRowSchema>;

export const progressUpsertInputSchema = z.object({
  sectionId: z.string().uuid(),
  status: progressStatusSchema.optional(),
  timeSpentDeltaSec: z.number().int().nonnegative().optional(),
});
export type ProgressUpsertInput = z.infer<typeof progressUpsertInputSchema>;
