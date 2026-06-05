import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/orpc";

export const Route = createFileRoute("/modules/")({
  component: function ModulesIndex() {
    const q = useQuery({ queryKey: ["modules"], queryFn: () => api.modules.list({}) });
    return (
      <div>
        <h1 className="text-[40px] font-semibold tracking-tight mb-8">All modules</h1>
        <ol className="space-y-3">
          {q.data?.map((m) => (
            <li key={m.id}>
              <Link
                to="/modules/$moduleSlug"
                params={{ moduleSlug: m.slug }}
                className="grid grid-cols-[40px_1fr_80px] gap-4 p-4 border border-[var(--border)] hover:bg-[var(--surface)] items-baseline max-w-[64ch]"
              >
                <span className="font-mono text-[12px] text-[var(--text-faint)]">{String(m.orderIndex).padStart(2, "0")}</span>
                <div>
                  <div className="font-medium text-[17px]">{m.title}</div>
                  <div className="text-[13px] text-[var(--text-muted)]">{m.summary}</div>
                </div>
                <span className="font-mono text-[11px] text-[var(--text-faint)] text-right">{m.completedSections}/{m.totalSections}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    );
  },
});
