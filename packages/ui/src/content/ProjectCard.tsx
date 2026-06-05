import type { ReactNode } from "react";

export function ProjectCard({ hours, starter, children }: { hours: string; starter?: string; children: ReactNode }) {
  return (
    <div className="my-3 max-w-[64ch] border border-[var(--emerald-soft)] bg-[var(--emerald-bg)] p-6">
      <div className="font-mono text-[11px] text-[var(--emerald)] uppercase tracking-widest mb-3">{hours} hours · starter included</div>
      <div className="space-y-3 text-[14px]">{children}</div>
      {starter && (
        <button className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 bg-[var(--emerald)] text-[var(--bg)] font-mono text-[11px] uppercase tracking-widest font-semibold">
          Open starter →
        </button>
      )}
    </div>
  );
}
