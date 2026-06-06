import type { ModuleDef } from "../../types";

export const webrtcModule: ModuleDef = {
  slug: "webrtc",
  track: "frontend",
  orderIndex: 8,
  title: "WebRTC",
  summary: "Peer-to-peer in the browser. Signaling, ICE, data channels, y-webrtc.",
  estMinutes: 260,
  sections: [
    { slug: "why",            title: "Why WebRTC",             kind: "why",          estMinutes: 7,   bodyMdxPath: "modules/webrtc/sections/why.mdx" },
    { slug: "mental-model",   title: "Mental model",           kind: "concept",      estMinutes: 11,  bodyMdxPath: "modules/webrtc/sections/mental-model.mdx" },
    { slug: "signaling",      title: "Signaling",              kind: "concept",      estMinutes: 11,  bodyMdxPath: "modules/webrtc/sections/signaling.mdx" },
    { slug: "nat-stun-turn",  title: "NAT, STUN, TURN",        kind: "concept",      estMinutes: 12,  bodyMdxPath: "modules/webrtc/sections/nat-stun-turn.mdx" },
    { slug: "data-channels",  title: "Data channels",          kind: "concept",      estMinutes: 11,  bodyMdxPath: "modules/webrtc/sections/data-channels.mdx" },
    { slug: "y-webrtc",       title: "y-webrtc for collab",    kind: "pattern",      estMinutes: 10,  bodyMdxPath: "modules/webrtc/sections/y-webrtc.mdx" },
    { slug: "tradeoffs",      title: "Tradeoffs",              kind: "tradeoff",     estMinutes: 9,   bodyMdxPath: "modules/webrtc/sections/tradeoffs.mdx" },
    { slug: "gotchas",        title: "Production gotchas",     kind: "gotcha",       estMinutes: 10,  bodyMdxPath: "modules/webrtc/sections/gotchas.mdx" },
    { slug: "mini-project",   title: "Yjs over y-webrtc",      kind: "mini_project", estMinutes: 180, bodyMdxPath: "modules/webrtc/sections/mini-project.mdx" },
    { slug: "quiz",           title: "Self-check",             kind: "quiz",         estMinutes: 7,   bodyMdxPath: "modules/webrtc/sections/quiz.mdx" },
    { slug: "cheatsheet",     title: "Cheatsheet",             kind: "cheatsheet",   estMinutes: 4,   bodyMdxPath: "modules/webrtc/sections/cheatsheet.mdx" },
  ],
};
