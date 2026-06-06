import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/orpc";

export const Route = createFileRoute("/")({
  component: function Dashboard() {
    const summary = useQuery({ queryKey: ["progress-summary"], queryFn: () => api.progress.summary({}) });
    const modules = useQuery({ queryKey: ["modules"], queryFn: () => api.modules.list({}) });

    const resumeModule = summary.data?.lastVisited
      ? modules.data?.find((m) => m.slug === summary.data!.lastVisited!.moduleSlug)
      : undefined;

    return (
      <div>
        <div className="font-mono text-[11px] text-[var(--text-faint)] uppercase tracking-widest mb-3">Overview</div>
        <h1 className="text-[40px] font-semibold tracking-tight mb-2">Dashboard</h1>
        <p className="text-[var(--text-muted)] text-[17px] mb-10">Pick up where you left off.</p>

        {summary.data?.lastVisited && (
          <Link
            to="/modules/$moduleSlug/$sectionSlug"
            params={{
              moduleSlug: summary.data.lastVisited.moduleSlug,
              sectionSlug: summary.data.lastVisited.sectionSlug,
            }}
            className="block border border-[var(--border)] bg-[var(--paper)] p-6 mb-12 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface)]"
          >
            <div className="font-mono text-[11px] text-[var(--text-faint)] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--teal)] inline-block" />
              Resume →
            </div>
            <div className="text-[22px] font-semibold leading-tight">{summary.data.lastVisited.sectionSlug}</div>
            <div className="text-[14px] text-[var(--text-muted)] mt-1">
              in <span className="text-[var(--text)]">{resumeModule?.title ?? summary.data.lastVisited.moduleSlug}</span>
            </div>
          </Link>
        )}

        <h2 className="text-[22px] font-semibold mb-4">Modules</h2>
        <ul className="space-y-2">
          {modules.data?.map((m) => {
            const pct = m.totalSections === 0 ? 0 : Math.round((m.completedSections / m.totalSections) * 100);
            return (
              <li key={m.id}>
                <Link
                  to="/modules/$moduleSlug"
                  params={{ moduleSlug: m.slug }}
                  className="grid grid-cols-[minmax(0,1fr)_120px] gap-5 px-5 py-4 border border-[var(--border)] bg-[var(--paper)] items-center transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface)]"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-[16px] text-[var(--text)]">{m.title}</div>
                    <div className="text-[13.5px] text-[var(--text-muted)] mt-0.5 leading-snug">{m.summary}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[13px] text-[var(--text)] tabular-nums">
                      {m.completedSections}<span className="text-[var(--text-faint)]"> / {m.totalSections}</span>
                    </div>
                    <div className="h-1 mt-2 bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
                      <div className="h-full bg-[var(--teal)] transition-[width] duration-300" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
});
