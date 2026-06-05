import { useQuery } from "@tanstack/react-query";
import type { SectionResponse } from "@prep-lab/contracts";
import { api } from "../../lib/orpc";
import { NotesScratchpad } from "../notes/NotesScratchpad";

export function SectionRail({ moduleSlug, data }: { moduleSlug: string; data: SectionResponse }) {
  const mod = useQuery({ queryKey: ["module", moduleSlug], queryFn: () => api.modules.get({ slug: moduleSlug }) });

  return (
    <>
      <RailBlock label={`Progress · ${mod.data?.title ?? "Module"}`}>
        <Row k="Sections" v={`${mod.data?.sections.length ?? 0}`} />
      </RailBlock>
      <RailBlock label="In this module">
        <ol className="text-[13px]">
          {mod.data?.sections.map((s) => (
            <li key={s.id} className={`py-1 ${s.slug === data.slug ? "text-[var(--text)] font-medium" : "text-[var(--text-muted)]"}`}>
              § {String(s.orderIndex + 1).padStart(2, "0")} · {s.title}
            </li>
          ))}
        </ol>
      </RailBlock>
      <RailBlock label="Notes · saved">
        <NotesScratchpad scope="section" refId={data.id} />
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
    <div className="flex justify-between text-[13px] py-1.5 border-b border-[var(--border)]">
      <span className="text-[var(--text-muted)]">{k}</span>
      <span className="font-mono">{v}</span>
    </div>
  );
}
