import { z } from "zod";

export const quizAnswerSchema = z.object({
  questionId: z.string(),
  selected: z.union([z.string(), z.array(z.string())]),
});

export const quizSubmissionInputSchema = z.object({
  sectionId: z.string().uuid(),
  answers: z.array(quizAnswerSchema),
});
export type QuizSubmissionInput = z.infer<typeof quizSubmissionInputSchema>;

export const quizSubmissionResultSchema = z.object({
  attemptId: z.string().uuid(),
  score: z.number().min(0).max(1),
  perQuestion: z.array(
    z.object({
      questionId: z.string(),
      correct: z.boolean(),
      explanation: z.string(),
    }),
  ),
});
export type QuizSubmissionResult = z.infer<typeof quizSubmissionResultSchema>;
