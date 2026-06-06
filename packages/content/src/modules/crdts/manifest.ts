import type { ModuleDef } from "../../types";

export const crdtsModule: ModuleDef = {
  slug: "crdts",
  track: "frontend",
  orderIndex: 6,
  title: "CRDTs",
  summary: "Conflict-free replicated data types. Theory, Yjs internals, production patterns.",
  estMinutes: 290,
  sections: [
    { slug: "why",                title: "Why CRDTs",                kind: "why",          estMinutes: 8,   bodyMdxPath: "modules/crdts/sections/why.mdx" },
    { slug: "mental-model",       title: "Mental model: convergence", kind: "concept",     estMinutes: 10,  bodyMdxPath: "modules/crdts/sections/mental-model.mdx" },
    { slug: "state-vs-op",        title: "State-based vs op-based",  kind: "concept",      estMinutes: 11,  bodyMdxPath: "modules/crdts/sections/state-vs-op.mdx" },
    { slug: "yjs-internals",      title: "Yjs internals",            kind: "concept",      estMinutes: 14,  bodyMdxPath: "modules/crdts/sections/yjs-internals.mdx" },
    { slug: "tombstones-and-gc",  title: "Tombstones and GC",        kind: "pattern",      estMinutes: 9,   bodyMdxPath: "modules/crdts/sections/tombstones-and-gc.mdx" },
    { slug: "tradeoffs",          title: "When NOT to use CRDTs",    kind: "tradeoff",     estMinutes: 10,  bodyMdxPath: "modules/crdts/sections/tradeoffs.mdx" },
    { slug: "gotchas",            title: "Production gotchas",       kind: "gotcha",       estMinutes: 10,  bodyMdxPath: "modules/crdts/sections/gotchas.mdx" },
    { slug: "mini-project",       title: "Two-tab collaborative editor", kind: "mini_project", estMinutes: 180, bodyMdxPath: "modules/crdts/sections/mini-project.mdx" },
    { slug: "quiz",               title: "Self-check",               kind: "quiz",         estMinutes: 7,   bodyMdxPath: "modules/crdts/sections/quiz.mdx" },
    { slug: "cheatsheet",         title: "Cheatsheet",               kind: "cheatsheet",   estMinutes: 5,   bodyMdxPath: "modules/crdts/sections/cheatsheet.mdx" },
  ],
};
