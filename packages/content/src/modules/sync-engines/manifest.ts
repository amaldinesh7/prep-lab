import type { ModuleDef } from "../../types";

export const syncEnginesModule: ModuleDef = {
  slug: "sync-engines",
  track: "frontend",
  orderIndex: 5,
  title: "Sync Engines",
  summary: "Cache-as-truth, mutators, server reconciliation. Linear, Replicache, Zero, LiveStore.",
  estMinutes: 360,
  sections: [
    { slug: "why",                 title: "Why sync engines",                     kind: "why",           estMinutes: 8,   bodyMdxPath: "modules/sync-engines/sections/why.mdx" },
    { slug: "mental-model",        title: "Mental model",                         kind: "concept",       estMinutes: 12,  bodyMdxPath: "modules/sync-engines/sections/mental-model.mdx" },
    { slug: "linear",              title: "Linear — the canonical example",       kind: "concept",       estMinutes: 11,  bodyMdxPath: "modules/sync-engines/sections/linear.mdx" },
    { slug: "replicache-and-zero", title: "Replicache and Zero",                  kind: "concept",       estMinutes: 14,  bodyMdxPath: "modules/sync-engines/sections/replicache-and-zero.mdx" },
    { slug: "livestore",           title: "LiveStore and event-sourcing",         kind: "concept",       estMinutes: 9,   bodyMdxPath: "modules/sync-engines/sections/livestore.mdx" },
    { slug: "comparison",          title: "Choosing one",                         kind: "pattern",       estMinutes: 10,  bodyMdxPath: "modules/sync-engines/sections/comparison.mdx" },
    { slug: "tradeoffs",           title: "Tradeoffs vs alternatives",            kind: "tradeoff",      estMinutes: 9,   bodyMdxPath: "modules/sync-engines/sections/tradeoffs.mdx" },
    { slug: "gotchas",             title: "Production gotchas",                   kind: "gotcha",        estMinutes: 9,   bodyMdxPath: "modules/sync-engines/sections/gotchas.mdx" },
    { slug: "mini-project",        title: "Offline-first todo with Replicache",   kind: "mini_project",  estMinutes: 240, bodyMdxPath: "modules/sync-engines/sections/mini-project.mdx" },
    { slug: "quiz",                title: "Self-check",                           kind: "quiz",          estMinutes: 7,   bodyMdxPath: "modules/sync-engines/sections/quiz.mdx" },
    { slug: "cheatsheet",          title: "Cheatsheet",                           kind: "cheatsheet",    estMinutes: 5,   bodyMdxPath: "modules/sync-engines/sections/cheatsheet.mdx" },
  ],
};
