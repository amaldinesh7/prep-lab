import type { ModuleDef } from "../../types";

export const serviceWorkersModule: ModuleDef = {
  slug: "service-workers",
  track: "frontend",
  orderIndex: 4,
  title: "Service Workers + Offline",
  summary:
    "SW lifecycle, cache strategies, background sync, offline-first patterns.",
  estMinutes: 250,
  sections: [
    {
      slug: "why",
      title: "Why service workers",
      kind: "why",
      estMinutes: 7,
      bodyMdxPath: "modules/service-workers/sections/why.mdx",
    },
    {
      slug: "lifecycle",
      title: "Lifecycle",
      kind: "concept",
      estMinutes: 12,
      bodyMdxPath: "modules/service-workers/sections/lifecycle.mdx",
    },
    {
      slug: "cache-strategies",
      title: "Cache strategies",
      kind: "pattern",
      estMinutes: 14,
      bodyMdxPath: "modules/service-workers/sections/cache-strategies.mdx",
    },
    {
      slug: "background-sync",
      title: "Background sync",
      kind: "concept",
      estMinutes: 10,
      bodyMdxPath: "modules/service-workers/sections/background-sync.mdx",
    },
    {
      slug: "workbox",
      title: "Workbox: production tooling",
      kind: "pattern",
      estMinutes: 9,
      bodyMdxPath: "modules/service-workers/sections/workbox.mdx",
    },
    {
      slug: "tradeoffs",
      title: "Tradeoffs",
      kind: "tradeoff",
      estMinutes: 8,
      bodyMdxPath: "modules/service-workers/sections/tradeoffs.mdx",
    },
    {
      slug: "gotchas",
      title: "Production gotchas",
      kind: "gotcha",
      estMinutes: 11,
      bodyMdxPath: "modules/service-workers/sections/gotchas.mdx",
    },
    {
      slug: "mini-project",
      title: "Offline-first reader",
      kind: "mini_project",
      estMinutes: 180,
      bodyMdxPath: "modules/service-workers/sections/mini-project.mdx",
    },
    {
      slug: "quiz",
      title: "Self-check",
      kind: "quiz",
      estMinutes: 7,
      bodyMdxPath: "modules/service-workers/sections/quiz.mdx",
    },
    {
      slug: "cheatsheet",
      title: "Cheatsheet",
      kind: "cheatsheet",
      estMinutes: 4,
      bodyMdxPath: "modules/service-workers/sections/cheatsheet.mdx",
    },
  ],
};
