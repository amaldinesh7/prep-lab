import type { SectionKind } from "@prep-lab/contracts";

export interface SectionDef {
  slug: string;
  title: string;
  kind: SectionKind;
  estMinutes: number;
  bodyMdxPath: string;  // relative to packages/content/src
}

export interface ModuleDef {
  slug: string;
  track: "frontend";
  orderIndex: number;
  title: string;
  summary: string;
  estMinutes: number;
  sections: SectionDef[];
}
