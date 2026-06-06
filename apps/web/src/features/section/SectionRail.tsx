import { useQuery } from "@tanstack/react-query";
import type { SectionResponse } from "@prep-lab/contracts";
import { sectionTypeStyles } from "@prep-lab/ui";
import { api } from "../../lib/orpc";
import { NotesScratchpad } from "../notes/NotesScratchpad";

export function SectionRail({ moduleSlug, data }: { moduleSlug: string; data: SectionResponse }) {
  const mod = useQuery({ queryKey: ["module", moduleSlug], queryFn: () => api.modules.get({ slug: moduleSlug }) });
  const accent = sectionTypeStyles[data.kind].accentVar;

  return (
    <>
      <RailBlock label={`Progress · ${mod.data?.title ?? "Module"}`} accent={accent}>
        <Row k="Sections" v={`${mod.data?.sections.length ?? 0}`} />
      </RailBlock>
      <RailBlock label="In this module" accent={accent}>
        <ol className="text-[13px]">
          {mod.data?.sections.map((s) => {
            const isActive = s.slug === data.slug;
            return (
              <li
                key={s.id}
                className={`relative pl-3 pr-1 py-1 rounded-[var(--radius-md)] transition-colors duration-150 ease-out ${
                  isActive
                    ? "text-[var(--text)] font-medium bg-[var(--surface)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full"
                    style={{ backgroundColor: `var(${accent})` }}
                  />
                )}
                § {String(s.orderIndex + 1).padStart(2, "0")} · {s.title}
              </li>
            );
          })}
        </ol>
      </RailBlock>
      <RailBlock label="Notes · saved" accent={accent}>
        <NotesScratchpad scope="section" refId={data.id} />
      </RailBlock>
    </>
  );
}

function RailBlock({ label, accent = "--brand", children }: { label: string; accent?: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-2 mb-2.5">
        <span aria-hidden className="w-[6px] h-[6px] rounded-[1px] shrink-0" style={{ backgroundColor: `var(${accent})` }} />
        <span className="text-[10px] uppercase tracking-widest font-semibold font-mono" style={{ color: `var(${accent})` }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-[13px] py-1.5 border-b border-[var(--border)]">
      <span className="text-[var(--text-muted)]">{k}</span>
      <span className="font-mono">{v}</span>
    </div>
  );
}
