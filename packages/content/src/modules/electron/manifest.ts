import type { ModuleDef } from "../../types";

export const electronModule: ModuleDef = {
  slug: "electron",
  track: "frontend",
  orderIndex: 10,
  title: "Electron",
  summary: "Main vs renderer, IPC, security model, packaging, Tauri comparison.",
  estMinutes: 79,
  sections: [
    { slug: "why",                    title: "Why Electron",             kind: "why",        estMinutes: 6,  bodyMdxPath: "modules/electron/sections/why.mdx" },
    { slug: "mental-model",           title: "Main vs renderer",         kind: "concept",    estMinutes: 11, bodyMdxPath: "modules/electron/sections/mental-model.mdx" },
    { slug: "ipc",                    title: "IPC patterns",             kind: "concept",    estMinutes: 11, bodyMdxPath: "modules/electron/sections/ipc.mdx" },
    { slug: "security",               title: "Security model",           kind: "pattern",    estMinutes: 12, bodyMdxPath: "modules/electron/sections/security.mdx" },
    { slug: "tauri-and-alternatives", title: "Tauri and alternatives",   kind: "tradeoff",   estMinutes: 10, bodyMdxPath: "modules/electron/sections/tauri-and-alternatives.mdx" },
    { slug: "packaging",              title: "Packaging + distribution", kind: "concept",    estMinutes: 9,  bodyMdxPath: "modules/electron/sections/packaging.mdx" },
    { slug: "gotchas",                title: "Production gotchas",       kind: "gotcha",     estMinutes: 10, bodyMdxPath: "modules/electron/sections/gotchas.mdx" },
    { slug: "quiz",                   title: "Self-check",               kind: "quiz",       estMinutes: 6,  bodyMdxPath: "modules/electron/sections/quiz.mdx" },
    { slug: "cheatsheet",             title: "Cheatsheet",               kind: "cheatsheet", estMinutes: 4,  bodyMdxPath: "modules/electron/sections/cheatsheet.mdx" },
  ],
};
