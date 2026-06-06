import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/orpc";
import { ThemeToggle } from "../../features/theme/ThemeToggle";

const ROMANS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"] as const;
function romanise(n: number): string {
  return ROMANS[n - 1] ?? String(n);
}

export function Sidebar() {
  const q = useQuery({ queryKey: ["modules"], queryFn: () => api.modules.list({}) });
  return (
    <aside className="px-6 2xl:px-7 3xl:px-8 py-7 2xl:py-8 sticky top-0 h-screen overflow-y-auto border-r border-[var(--border)] w-full shrink-0">
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-[var(--border)]">
        <div className="flex flex-col gap-1">
          <div className="text-[15px] font-semibold flex items-baseline gap-2">
            prep-lab <span className="font-mono text-[11px] text-[var(--text-faint)]">v0.1</span>
          </div>
          <div className="text-[11px] font-mono text-[var(--text-faint)] uppercase tracking-wider">Frontend curriculum</div>
        </div>
        <ThemeToggle />
      </div>

      <NavSection label="Overview">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/modules">All modules</NavLink>
        <NavLink to="/notes">Notes</NavLink>
      </NavSection>

      <NavSection label="Frontend track">
        {q.data?.map((m, i) => {
          const pct = m.totalSections === 0 ? 0 : Math.round((m.completedSections / m.totalSections) * 100);
          return (
            <NavLink key={m.id} to="/modules/$moduleSlug" params={{ moduleSlug: m.slug }}>
              <span className="font-mono text-[11px] text-[var(--text-faint)] mr-2.5 inline-block min-w-[22px] shrink-0">{romanise(i + 1)}.</span>
              <span className="truncate">{m.title}</span>
              {m.completedSections > 0 && (
                <span className="ml-auto pl-2 font-mono text-[10px] text-[var(--text-faint)] tabular-nums shrink-0">{pct}%</span>
              )}
            </NavLink>
          );
        })}
      </NavSection>
    </aside>
  );
}

function NavSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] font-mono font-semibold mb-3">{label}</div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function NavLink({ to, params, children }: { to: string; params?: Record<string, string>; children: React.ReactNode }) {
  return (
    <Link
      to={to as never}
      params={params as never}
      className="flex items-baseline py-1 text-[14px] text-[var(--text-muted)] hover:text-[var(--text)] min-w-0"
      activeProps={{ className: "text-[var(--text)] font-medium" }}
    >
      {children}
    </Link>
  );
}
