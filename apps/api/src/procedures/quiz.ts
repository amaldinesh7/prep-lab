import { db, sections, quizAttempts } from "@prep-lab/db";
import { eq } from "drizzle-orm";
import { loadQuizForBodyPath } from "@prep-lab/content";
import { base } from "../orpc";

export const quizProcedures = {
  submit: base.quiz.submit.handler(async ({ input }) => {
    const [section] = await db.select().from(sections).where(eq(sections.id, input.sectionId)).limit(1);
    if (!section) throw new Error("section not found");
    const quiz = await loadQuizForBodyPath(section.bodyMdxPath);
    if (!quiz) throw new Error("no quiz for this section");

    const perQuestion = quiz.questions.map((q) => {
      const ans = input.answers.find((a) => a.questionId === q.id);
      const selected = ans?.selected;
      const correct = Array.isArray(q.correct)
        ? Array.isArray(selected) && q.correct.length === selected.length && q.correct.every((c) => selected.includes(c))
        : selected === q.correct;
      return { questionId: q.id, correct, explanation: q.explanation };
    });
    const score = perQuestion.filter((p) => p.correct).length / quiz.questions.length;

    const [att] = await db.insert(quizAttempts).values({
      sectionId: input.sectionId,
      score: score.toFixed(2),
      answersJson: input.answers,
    }).returning({ id: quizAttempts.id });

    return { attemptId: att!.id, score, perQuestion };
  }),
};
