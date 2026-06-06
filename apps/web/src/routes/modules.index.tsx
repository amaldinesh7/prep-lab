import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/orpc";

export const Route = createFileRoute("/modules/")({
  component: function ModulesIndex() {
    const q = useQuery({ queryKey: ["modules"], queryFn: () => api.modules.list({}) });
    return (
      <div>
        <div className="font-mono text-[11px] text-[var(--text-faint)] uppercase tracking-widest mb-3">Track · Frontend</div>
        <h1 className="text-[40px] font-semibold tracking-tight mb-2">All modules</h1>
        <p className="text-[var(--text-muted)] text-[16px] mb-10">{q.data?.length ?? 0} modules · pick one to begin.</p>
        <ol className="space-y-2">
          {q.data?.map((m) => {
            const pct = m.totalSections === 0 ? 0 : Math.round((m.completedSections / m.totalSections) * 100);
            return (
              <li key={m.id}>
                <Link
                  to="/modules/$moduleSlug"
                  params={{ moduleSlug: m.slug }}
                  className="grid grid-cols-[56px_minmax(0,1fr)_104px] gap-5 px-5 py-4 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--paper)] items-baseline transition-colors duration-150 ease-out hover:bg-[var(--surface)]"
                >
                  <span className="font-mono text-[13px] text-[var(--text-faint)] tabular-nums">
                    {String(m.orderIndex).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="font-medium text-[17px] text-[var(--text)] truncate">{m.title}</div>
                    <div className="text-[13.5px] text-[var(--text-muted)] mt-1 leading-snug">{m.summary}</div>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1 h-1 bg-[var(--surface)] border border-[var(--border)] overflow-hidden rounded-full">
                        <div className="h-full bg-[var(--brand)] transition-[width] duration-300 ease-out" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-widest min-w-[34px] text-right">{pct}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[13px] text-[var(--text)] tabular-nums">
                      {m.completedSections}<span className="text-[var(--text-faint)]"> / {m.totalSections}</span>
                    </div>
                    <div className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-widest mt-0.5">sections</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    );
  },
});
