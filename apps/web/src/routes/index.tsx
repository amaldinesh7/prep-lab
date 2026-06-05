import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/orpc";

export const Route = createFileRoute("/")({
  component: function Dashboard() {
    const summary = useQuery({ queryKey: ["progress-summary"], queryFn: () => api.progress.summary({}) });
    const modules = useQuery({ queryKey: ["modules"], queryFn: () => api.modules.list({}) });

    return (
      <div>
        <h1 className="text-[40px] font-semibold tracking-tight mb-2">Dashboard</h1>
        <p className="text-[var(--text-muted)] text-[17px] mb-10">Pick up where you left off.</p>

        {summary.data?.lastVisited && (
          <Link
            to="/modules/$moduleSlug/$sectionSlug"
            params={{ moduleSlug: summary.data.lastVisited.moduleSlug, sectionSlug: summary.data.lastVisited.sectionSlug }}
            className="block border border-[var(--border)] p-6 mb-10 hover:bg-[var(--surface)] max-w-[64ch]"
          >
            <div className="font-mono text-[11px] text-[var(--text-faint)] uppercase tracking-widest mb-2">Resume →</div>
            <div className="text-[20px] font-medium">{summary.data.lastVisited.sectionSlug}</div>
            <div className="text-[13px] text-[var(--text-muted)] mt-1">in {summary.data.lastVisited.moduleSlug}</div>
          </Link>
        )}

        <h2 className="text-[22px] font-semibold mb-4">Modules</h2>
        <ul className="space-y-2 max-w-[64ch]">
          {modules.data?.map((m) => (
            <li key={m.id}>
              <Link
                to="/modules/$moduleSlug"
                params={{ moduleSlug: m.slug }}
                className="flex justify-between border border-[var(--border)] p-4 hover:bg-[var(--surface)]"
              >
                <div>
                  <div className="font-medium">{m.title}</div>
                  <div className="text-[13px] text-[var(--text-muted)]">{m.summary}</div>
                </div>
                <div className="font-mono text-[11px] text-[var(--text-faint)] self-center">{m.completedSections}/{m.totalSections}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  },
});
