import { Link } from "@tanstack/react-router";

interface PagerProps {
  moduleSlug: string;
  prevSlug: string | null;
  nextSlug: string | null;
  prevTitle?: string;
  nextTitle?: string;
  onMarkDone?: () => void;
  doneLabel?: string;
}

export function Pager({ moduleSlug, prevSlug, nextSlug, prevTitle, nextTitle, onMarkDone, doneLabel = "Mark complete" }: PagerProps) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-3 mt-20 pt-6 border-t border-[var(--border)] max-w-[64ch] items-stretch">
      {prevSlug ? (
        <Link
          to="/modules/$moduleSlug/$sectionSlug"
          params={{ moduleSlug, sectionSlug: prevSlug } as never}
          className="px-4.5 py-3.5 border border-[var(--border)] bg-[var(--paper)] text-[14px] hover:bg-[var(--surface)]"
        >
          <div className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-widest">← Previous</div>
          <div className="font-medium mt-1">{prevTitle ?? "Previous"}</div>
        </Link>
      ) : <span />}

      <button
        onClick={onMarkDone}
        className="px-5 bg-[var(--text)] text-[var(--paper)] border border-[var(--text)] font-mono text-[11px] cursor-pointer font-semibold tracking-widest uppercase hover:bg-[var(--teal)] hover:border-[var(--teal)] hover:text-white"
      >
        {doneLabel}
      </button>

      {nextSlug ? (
        <Link
          to="/modules/$moduleSlug/$sectionSlug"
          params={{ moduleSlug, sectionSlug: nextSlug } as never}
          className="px-4.5 py-3.5 border border-[var(--border)] bg-[var(--paper)] text-[14px] hover:bg-[var(--surface)] text-right"
        >
          <div className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-widest">Next →</div>
          <div className="font-medium mt-1">{nextTitle ?? "Next"}</div>
        </Link>
      ) : <span />}
    </div>
  );
}
