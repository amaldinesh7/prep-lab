import { z } from "zod";

export const noteScopeSchema = z.enum(["module", "section"]);
export type NoteScope = z.infer<typeof noteScopeSchema>;

export const noteSchema = z.object({
  id: z.string().uuid(),
  scope: noteScopeSchema,
  refId: z.string().uuid(),
  bodyMd: z.string(),
  updatedAt: z.string().datetime(),
});
export type Note = z.infer<typeof noteSchema>;

export const noteUpsertInputSchema = z.object({
  scope: noteScopeSchema,
  refId: z.string().uuid(),
  bodyMd: z.string(),
});
export type NoteUpsertInput = z.infer<typeof noteUpsertInputSchema>;
