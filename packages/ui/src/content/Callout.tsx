import type { ReactNode } from "react";

type Kind = "why" | "pattern" | "tradeoff" | "gotcha";

const styles: Record<Kind, { bar: string; bg: string; label: string; labelText: string }> = {
  why:      { bar: "border-[var(--teal)]",    bg: "bg-[var(--teal-bg)]",    label: "Why this matters", labelText: "text-[var(--teal)]" },
  pattern:  { bar: "border-[var(--emerald)]", bg: "bg-[var(--emerald-bg)]", label: "Pattern",          labelText: "text-[var(--emerald)]" },
  tradeoff: { bar: "border-[var(--amber)]",   bg: "bg-[var(--amber-bg)]",   label: "Tradeoff",         labelText: "text-[var(--amber)]" },
  gotcha:   { bar: "border-[var(--rose)]",    bg: "bg-[var(--rose-bg)]",    label: "Gotcha",           labelText: "text-[var(--rose)]" },
};

export function Callout({ kind, label, children }: { kind: Kind; label?: string; children: ReactNode }) {
  const s = styles[kind];
  return (
    <div className={`my-5 max-w-[64ch] px-5.5 py-4 border-l-[3px] ${s.bar} ${s.bg}`}>
      <div className={`font-mono text-[10px] uppercase tracking-widest font-semibold mb-2 ${s.labelText}`}>{label ?? s.label}</div>
      <div className="text-[14.5px] leading-[1.6]">{children}</div>
    </div>
  );
}
