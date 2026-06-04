import type { ModuleDef } from "../../types";

export const tanstackRouterModule: ModuleDef = {
  slug: "tanstack-router",
  track: "frontend",
  orderIndex: 1,
  title: "Tanstack Router",
  summary: "File-based routing, type-safe params and loaders.",
  estMinutes: 180,
  sections: [
    {
      slug: "exemplar",
      title: "Exemplar — every section type",
      kind: "concept",
      estMinutes: 12,
      bodyMdxPath: "modules/tanstack-router/sections/exemplar.mdx",
    },
  ],
};
