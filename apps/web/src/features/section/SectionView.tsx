import { useEffect, useState } from "react";
import { Pager } from "@prep-lab/ui";
import type { SectionResponse } from "@prep-lab/contracts";
import { MdxRenderer } from "../content/MdxRenderer";
import { compileMdx } from "../content/compileMdx";
import { QuizContext } from "../content/mdxComponents";
import { useProgress } from "../progress/useProgress";
import { useRailSlot } from "../../components/layout/RailSlot";
import { SectionRail } from "./SectionRail";
import { api } from "../../lib/orpc";

export function SectionView({ moduleSlug, data }: { moduleSlug: string; data: SectionResponse }) {
  const [compiled, setCompiled] = useState<string | null>(null);
  const { markComplete, heartbeat } = useProgress(data.id);

  useEffect(() => { compileMdx(data.bodyMdx).then(setCompiled); }, [data.bodyMdx]);
  useEffect(() => { heartbeat(); const t = setInterval(heartbeat, 30_000); return () => clearInterval(t); }, [heartbeat]);

  useRailSlot(<SectionRail moduleSlug={moduleSlug} data={data} />);

  return (
    <>
      <div className="font-mono text-[11px] text-[var(--text-faint)] uppercase tracking-widest mb-2 flex gap-3 items-center">
        <span className="bg-[var(--teal-bg)] text-[var(--teal)] border border-[var(--teal-soft)] px-2.5 py-0.5">Section {data.orderIndex + 1}</span>
        <span className="w-6 h-px bg-[var(--border-strong)]" />
        <span>~{data.estMinutes} min</span>
      </div>

      <QuizContext.Provider
        value={data.quiz ? {
          sectionId: data.id,
          questions: data.quiz.questions,
          onSubmit: api.quiz.submit,
        } : null}
      >
        {compiled ? <MdxRenderer compiled={compiled} /> : <p className="text-[var(--text-faint)]">Loading content…</p>}
      </QuizContext.Provider>

      <Pager
        moduleSlug={moduleSlug}
        prevSlug={data.prevSlug}
        nextSlug={data.nextSlug}
        onMarkDone={markComplete}
      />
    </>
  );
}
