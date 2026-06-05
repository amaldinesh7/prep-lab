import type { SectionKind } from "@prep-lab/contracts";
import { sectionTypeStyles } from "../lib/sectionType";

export function SectionHeader({ kind, number, title }: { kind: SectionKind; number: number; title: string }) {
  const s = sectionTypeStyles[kind];
  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-4">
        <span className={`font-mono text-[13px] font-medium py-1 px-2.5 rounded-[3px] tracking-wider border ${s.numChip}`}>§ {String(number).padStart(2, "0")}</span>
        <span className={`font-mono text-[10px] font-semibold uppercase tracking-widest ${s.typeText}`}>{s.label}</span>
        <span className={`flex-1 h-px ${s.bar}`} />
      </div>
      <h2 className={`text-[26px] font-semibold leading-[1.2] tracking-tight border-l-[3px] pl-3.5 ${s.headingBar}`}>{title}</h2>
    </div>
  );
}
