import { Link, useLocation } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { sectionTypeStyles } from "@prep-lab/ui";
import type { SectionKind } from "@prep-lab/contracts";
import { api } from "../../lib/orpc";

export function DefaultRail() {
  const { pathname } = useLocation();

  if (pathname === "/") return <DashboardRail />;
  if (pathname === "/modules") return <AllModulesRail />;
  if (pathname.startsWith("/modules/")) return <ModuleOverviewRail slug={pathname.split("/")[2]!} />;
  if (pathname === "/notes") return <NotesRail />;
  return null;
}

function DashboardRail() {
  const summary = useQuery({ queryKey: ["progress-summary"], queryFn: () => api.progress.summary({}) });
  const modules = useQuery({ queryKey: ["modules"], queryFn: () => api.modules.list({}) });

  const total = summary.data?.totalSections ?? 0;
  const completed = summary.data?.completedSections ?? 0;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  const minutesSpent = Math.round((summary.data?.timeSpentSec ?? 0) / 60);

  return (
    <>
      <RailBlock label="Overall progress">
        <ProgressBar pct={pct} />
        <Row k="Sections done" v={`${completed} / ${total}`} />
        <Row k="Time invested" v={`${minutesSpent} min`} />
      </RailBlock>

      {summary.data?.lastVisited && (
        <RailBlock label="Resume">
          <Link
            to="/modules/$moduleSlug/$sectionSlug"
            params={{
              moduleSlug: summary.data.lastVisited.moduleSlug,
              sectionSlug: summary.data.lastVisited.sectionSlug,
            }}
            className="block text-[13px] text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            <div className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-widest mb-1">→ continue</div>
            <div className="text-[var(--text)] font-medium">{summary.data.lastVisited.sectionSlug}</div>
            <div className="text-[12px] text-[var(--text-faint)] mt-0.5">in {summary.data.lastVisited.moduleSlug}</div>
          </Link>
        </RailBlock>
      )}

      <RailBlock label="Modules">
        <Row k="Total" v={`${modules.data?.length ?? 0}`} />
        <Row k="Sections" v={`${total}`} />
      </RailBlock>
    </>
  );
}

function AllModulesRail() {
  const modules = useQuery({ queryKey: ["modules"], queryFn: () => api.modules.list({}) });
  const totalSections = modules.data?.reduce((acc, m) => acc + m.totalSections, 0) ?? 0;
  const totalMinutes = modules.data?.reduce((acc, m) => acc + m.estMinutes, 0) ?? 0;
  const kinds: SectionKind[] = ["why", "concept", "pattern", "tradeoff", "gotcha", "mini_project", "quiz", "cheatsheet"];

  return (
    <>
      <RailBlock label="Track · Frontend">
        <Row k="Modules" v={`${modules.data?.length ?? 0}`} />
        <Row k="Sections" v={`${totalSections}`} />
        <Row k="Est. time" v={`${Math.round(totalMinutes / 60)} h`} />
      </RailBlock>

      <RailBlock label="Section kinds">
        <ul className="flex flex-col gap-1.5">
          {kinds.map((k) => {
            const s = sectionTypeStyles[k];
            return (
              <li key={k} className="flex items-center gap-2 text-[12px]">
                <span className={`w-1.5 h-1.5 inline-block ${s.dot}`} />
                <span className="text-[var(--text-muted)]">{s.label}</span>
              </li>
            );
          })}
        </ul>
      </RailBlock>
    </>
  );
}

function ModuleOverviewRail({ slug }: { slug: string }) {
  const mod = useQuery({ queryKey: ["module", slug], queryFn: () => api.modules.get({ slug }) });
  const first = mod.data?.sections[0];
  const kinds: { kind: SectionKind; count: number }[] = (() => {
    if (!mod.data) return [];
    const map = new Map<SectionKind, number>();
    for (const s of mod.data.sections) map.set(s.kind, (map.get(s.kind) ?? 0) + 1);
    return Array.from(map.entries()).map(([kind, count]) => ({ kind, count }));
  })();

  return (
    <>
      <RailBlock label={mod.data?.title ?? "Module"}>
        <Row k="Sections" v={`${mod.data?.sections.length ?? 0}`} />
        <Row k="Est. time" v={`${mod.data?.estMinutes ?? 0} min`} />
        <Row k="Track" v={mod.data?.track ?? "—"} />
      </RailBlock>

      {first && (
        <RailBlock label="Start">
          <Link
            to="/modules/$moduleSlug/$sectionSlug"
            params={{ moduleSlug: slug, sectionSlug: first.slug }}
            className="block border border-[var(--border)] bg-[var(--paper)] px-3 py-2.5 text-[13px] hover:border-[var(--border-strong)]"
          >
            <div className="font-mono text-[10px] text-[var(--text-faint)] uppercase tracking-widest mb-1">→ begin</div>
            <div className="font-medium">{first.title}</div>
          </Link>
        </RailBlock>
      )}

      {kinds.length > 0 && (
        <RailBlock label="Breakdown">
          <ul className="flex flex-col gap-1.5">
            {kinds.map(({ kind, count }) => {
              const s = sectionTypeStyles[kind];
              return (
                <li key={kind} className="flex items-center gap-2 text-[12px]">
                  <span className={`w-1.5 h-1.5 inline-block ${s.dot}`} />
                  <span className="text-[var(--text-muted)] flex-1">{s.label}</span>
                  <span className="font-mono text-[11px] text-[var(--text-faint)]">×{count}</span>
                </li>
              );
            })}
          </ul>
        </RailBlock>
      )}
    </>
  );
}

function NotesRail() {
  return (
    <>
      <RailBlock label="Search tips">
        <ul className="text-[12.5px] text-[var(--text-muted)] space-y-2 leading-relaxed">
          <li>Search is full-text over saved notes.</li>
          <li>
            <code className="font-mono text-[11.5px] bg-[var(--hover)] border border-[var(--border)] px-1 py-0.5">
              keyword
            </code>{" "}
            matches any note body.
          </li>
          <li>Empty? Open any section and start typing in the scratchpad — it auto-saves.</li>
        </ul>
      </RailBlock>

      <RailBlock label="Scopes">
        <Row k="module" v="per-module notes" />
        <Row k="section" v="per-section notes" />
      </RailBlock>
    </>
  );
}

function RailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <div className="text-[10px] uppercase tracking-widest text-[var(--text-faint)] mb-2.5 font-semibold font-mono">{label}</div>
      {children}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-[13px] py-1.5 border-b border-[var(--border)] last:border-b-0">
      <span className="text-[var(--text-muted)]">{k}</span>
      <span className="font-mono text-[var(--text)]">{v}</span>
    </div>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="font-mono text-[11px] text-[var(--text-faint)] uppercase tracking-widest">complete</span>
        <span className="font-mono text-[13px] text-[var(--text)]">{pct}%</span>
      </div>
      <div className="h-1 bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
        <div className="h-full bg-[var(--teal)] transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
