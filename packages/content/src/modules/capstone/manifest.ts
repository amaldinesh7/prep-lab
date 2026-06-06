import type { ModuleDef } from "../../types";

export const capstoneModule: ModuleDef = {
  slug: "capstone",
  track: "frontend",
  orderIndex: 11,
  title: "Capstone — Collaborative agent task list",
  summary: "Ship a real project exercising routing, CRDT, sync, offline, optimistic UI, agents.",
  estMinutes: 48,
  sections: [
    {
      slug: "overview",
      title: "The project",
      kind: "concept",
      estMinutes: 10,
      bodyMdxPath: "modules/capstone/sections/overview.mdx",
    },
    {
      slug: "architecture",
      title: "Architecture",
      kind: "pattern",
      estMinutes: 14,
      bodyMdxPath: "modules/capstone/sections/architecture.mdx",
    },
    {
      slug: "milestones",
      title: "Build in milestones",
      kind: "pattern",
      estMinutes: 12,
      bodyMdxPath: "modules/capstone/sections/milestones.mdx",
    },
    {
      slug: "stretch-goals",
      title: "Stretch goals",
      kind: "pattern",
      estMinutes: 8,
      bodyMdxPath: "modules/capstone/sections/stretch-goals.mdx",
    },
    {
      slug: "closing",
      title: "Done. What's next?",
      kind: "cheatsheet",
      estMinutes: 4,
      bodyMdxPath: "modules/capstone/sections/closing.mdx",
    },
  ],
};
