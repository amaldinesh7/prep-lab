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
  const navLinkClass =
    "px-5 py-3.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--paper)] text-[14px] transition-colors duration-150 ease-out hover:bg-[var(--surface)]";

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-3 mt-20 pt-6 border-t border-[var(--border)] max-w-[64ch] items-stretch">
      {prevSlug ? (
        <Link
          to="/modules/$moduleSlug/$sectionSlug"
          params={{ moduleSlug, sectionSlug: prevSlug } as never}
          className={navLinkClass}
        >
          <div className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-widest">← Previous</div>
          <div className="font-medium mt-1">{prevTitle ?? "Previous"}</div>
        </Link>
      ) : <span />}

      <button
        onClick={onMarkDone}
        disabled={!onMarkDone}
        className="
          self-center px-6 py-2.5 rounded-[var(--radius-md)]
          bg-[var(--brand-bg)] text-[var(--brand)] border border-[var(--brand-soft)]
          text-[13.5px] font-medium tracking-normal
          cursor-pointer
          transition-[background-color,border-color,transform] duration-150
          hover:bg-[var(--brand-soft)] hover:border-[var(--brand)]
          active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-default disabled:hover:bg-[var(--brand-bg)] disabled:hover:border-[var(--brand-soft)] disabled:active:scale-100
        "
        style={{ transitionTimingFunction: "var(--ease-soft)" }}
      >
        {doneLabel}
      </button>

      {nextSlug ? (
        <Link
          to="/modules/$moduleSlug/$sectionSlug"
          params={{ moduleSlug, sectionSlug: nextSlug } as never}
          className={`${navLinkClass} text-right`}
        >
          <div className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-widest">Next →</div>
          <div className="font-medium mt-1">{nextTitle ?? "Next"}</div>
        </Link>
      ) : <span />}
    </div>
  );
}
