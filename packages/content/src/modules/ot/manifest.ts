import type { ModuleDef } from "../../types";

export const otModule: ModuleDef = {
  slug: "ot",
  track: "frontend",
  orderIndex: 7,
  title: "Operational Transform",
  summary: "How Google Docs works. OT theory, vs CRDT, when each wins.",
  estMinutes: 67,
  sections: [
    { slug: "why",            title: "Why OT exists",            kind: "why",        estMinutes: 6,  bodyMdxPath: "modules/ot/sections/why.mdx" },
    { slug: "mental-model",   title: "How OT works",             kind: "concept",    estMinutes: 12, bodyMdxPath: "modules/ot/sections/mental-model.mdx" },
    { slug: "google-docs",    title: "How Google Docs does it",  kind: "concept",    estMinutes: 10, bodyMdxPath: "modules/ot/sections/google-docs.mdx" },
    { slug: "ot-vs-crdt",     title: "OT vs CRDT head-to-head",  kind: "concept",    estMinutes: 11, bodyMdxPath: "modules/ot/sections/ot-vs-crdt.mdx" },
    { slug: "tradeoffs",      title: "When OT still wins",       kind: "tradeoff",   estMinutes: 9,  bodyMdxPath: "modules/ot/sections/tradeoffs.mdx" },
    { slug: "gotchas",        title: "Production gotchas",       kind: "gotcha",     estMinutes: 9,  bodyMdxPath: "modules/ot/sections/gotchas.mdx" },
    { slug: "quiz",           title: "Self-check",               kind: "quiz",       estMinutes: 6,  bodyMdxPath: "modules/ot/sections/quiz.mdx" },
    { slug: "cheatsheet",     title: "Cheatsheet",               kind: "cheatsheet", estMinutes: 4,  bodyMdxPath: "modules/ot/sections/cheatsheet.mdx" },
  ],
};
