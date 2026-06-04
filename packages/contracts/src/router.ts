import { oc } from "@orpc/contract";
import {
  moduleSchema, moduleWithProgressSchema,
  sectionSummarySchema, sectionResponseSchema,
  progressRowSchema, progressUpsertInputSchema,
  noteSchema, noteUpsertInputSchema, noteScopeSchema,
  quizSubmissionInputSchema, quizSubmissionResultSchema,
} from "./index";
import { z } from "zod";

export const appContract = {
  modules: {
    list: oc
      .input(z.object({}).optional())
      .output(z.array(moduleWithProgressSchema)),
    get: oc
      .input(z.object({ slug: z.string() }))
      .output(moduleSchema.extend({ sections: z.array(sectionSummarySchema) })),
  },
  sections: {
    get: oc
      .input(z.object({ moduleSlug: z.string(), sectionSlug: z.string() }))
      .output(sectionResponseSchema),
  },
  progress: {
    upsert: oc
      .input(progressUpsertInputSchema)
      .output(progressRowSchema),
    summary: oc
      .input(z.object({}).optional())
      .output(z.object({
        totalSections: z.number(),
        completedSections: z.number(),
        timeSpentSec: z.number(),
        lastVisited: z.object({
          moduleSlug: z.string(),
          sectionSlug: z.string(),
          at: z.string().datetime(),
        }).nullable(),
      })),
  },
  notes: {
    get: oc
      .input(z.object({ scope: noteScopeSchema, refId: z.string().uuid() }))
      .output(noteSchema.nullable()),
    upsert: oc
      .input(noteUpsertInputSchema)
      .output(noteSchema),
    search: oc
      .input(z.object({ q: z.string().min(1) }))
      .output(z.array(noteSchema)),
  },
  quiz: {
    submit: oc
      .input(quizSubmissionInputSchema)
      .output(quizSubmissionResultSchema),
  },
} as const;

export type AppContract = typeof appContract;
