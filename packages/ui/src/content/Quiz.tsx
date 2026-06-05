import { useState } from "react";
import type { QuizSubmissionResult } from "@prep-lab/contracts";

export interface QuizQuestionUI {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
}

export interface QuizProps {
  sectionId: string;
  questions: QuizQuestionUI[];
  onSubmit: (input: { sectionId: string; answers: { questionId: string; selected: string }[] }) => Promise<QuizSubmissionResult>;
}

export function Quiz({ sectionId, questions, onSubmit }: QuizProps) {
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizSubmissionResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setSubmitting(true);
    try {
      const r = await onSubmit({
        sectionId,
        answers: questions.map((q) => ({ questionId: q.id, selected: picked[q.id] ?? "" })),
      });
      setResult(r);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="my-3 max-w-[64ch] border border-[var(--indigo-soft)] bg-[var(--indigo-bg)] p-5.5">
      <div className="font-mono text-[10px] text-[var(--indigo)] uppercase tracking-[0.16em] font-semibold mb-3">
        Question · {questions.length === 1 ? "1 / 1" : `1 / ${questions.length}`}
      </div>
      {questions.map((q) => {
        const r = result?.perQuestion.find((p) => p.questionId === q.id);
        return (
          <div key={q.id} className="mb-5">
            <div className="font-medium mb-4 text-[16px] leading-snug">{q.prompt}</div>
            {q.options.map((opt) => {
              const isPicked = picked[q.id] === opt.id;
              const correct = r?.correct && isPicked;
              const wrong = r && !r.correct && isPicked;
              return (
                <label
                  key={opt.id}
                  className={`grid grid-cols-[24px_1fr] gap-3 px-3.5 py-2.5 bg-[var(--paper)] border mb-1.5 cursor-pointer items-baseline text-[14px] ${
                    correct ? "border-[var(--emerald)]" :
                    wrong ? "border-[var(--rose)]" :
                    isPicked ? "border-[var(--indigo)]" : "border-[var(--border)] hover:border-[var(--indigo)]"
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={opt.id}
                    className="sr-only"
                    checked={isPicked}
                    onChange={() => setPicked((p) => ({ ...p, [q.id]: opt.id }))}
                  />
                  <span className="font-mono text-[12px] text-[var(--indigo)] font-semibold">{opt.id}</span>
                  <span>{opt.label}</span>
                </label>
              );
            })}
            {r && (
              <div className={`mt-2 text-[13px] ${r.correct ? "text-[var(--emerald)]" : "text-[var(--rose)]"}`}>
                {r.correct ? "Correct." : "Not quite."} {r.explanation}
              </div>
            )}
          </div>
        );
      })}
      {!result && (
        <button
          onClick={submit}
          disabled={submitting || Object.keys(picked).length < questions.length}
          className="px-4 py-2 bg-[var(--indigo)] text-white font-mono text-[11px] uppercase tracking-widest font-semibold disabled:opacity-50"
        >
          {submitting ? "Checking…" : "Submit"}
        </button>
      )}
      {result && <div className="mt-3 font-mono text-[12px] text-[var(--indigo)]">Score: {(result.score * 100).toFixed(0)}%</div>}
    </div>
  );
}
