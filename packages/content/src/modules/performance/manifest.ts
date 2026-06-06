import type { ModuleDef } from "../../types";

export const performanceModule: ModuleDef = {
  slug: "performance",
  track: "frontend",
  orderIndex: 2,
  title: "Frontend Performance",
  summary: "Profiling, bundle anatomy, React rendering patterns, Core Web Vitals.",
  estMinutes: 270,
  sections: [
    { slug: "why",              title: "Why performance is product", kind: "why",          estMinutes: 7,   bodyMdxPath: "modules/performance/sections/why.mdx" },
    { slug: "mental-model",     title: "Where time goes",          kind: "concept",      estMinutes: 11,  bodyMdxPath: "modules/performance/sections/mental-model.mdx" },
    { slug: "profiling",        title: "Profiling tools",          kind: "concept",      estMinutes: 13,  bodyMdxPath: "modules/performance/sections/profiling.mdx" },
    { slug: "bundle-size",      title: "Bundle anatomy",           kind: "concept",      estMinutes: 12,  bodyMdxPath: "modules/performance/sections/bundle-size.mdx" },
    { slug: "react-rendering",  title: "React rendering patterns", kind: "pattern",      estMinutes: 12,  bodyMdxPath: "modules/performance/sections/react-rendering.mdx" },
    { slug: "core-web-vitals",  title: "Core Web Vitals",          kind: "concept",      estMinutes: 11,  bodyMdxPath: "modules/performance/sections/core-web-vitals.mdx" },
    { slug: "tradeoffs",        title: "Tradeoffs",                kind: "tradeoff",     estMinutes: 8,   bodyMdxPath: "modules/performance/sections/tradeoffs.mdx" },
    { slug: "gotchas",          title: "Production gotchas",       kind: "gotcha",       estMinutes: 11,  bodyMdxPath: "modules/performance/sections/gotchas.mdx" },
    { slug: "mini-project",     title: "Profile + optimize a slow app", kind: "mini_project", estMinutes: 180, bodyMdxPath: "modules/performance/sections/mini-project.mdx" },
    { slug: "quiz",             title: "Self-check",               kind: "quiz",         estMinutes: 7,   bodyMdxPath: "modules/performance/sections/quiz.mdx" },
    { slug: "cheatsheet",       title: "Cheatsheet",               kind: "cheatsheet",   estMinutes: 4,   bodyMdxPath: "modules/performance/sections/cheatsheet.mdx" },
  ],
};
