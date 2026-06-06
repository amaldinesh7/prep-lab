import type { ModuleDef } from "../../types";

export const reactNativeModule: ModuleDef = {
  slug: "react-native",
  track: "frontend",
  orderIndex: 9,
  title: "React Native",
  summary: "How RN works, Expo workflow, navigation, native modules, production realities.",
  estMinutes: 78,
  sections: [
    { slug: "why",             title: "Why React Native",        kind: "why",        estMinutes: 6,  bodyMdxPath: "modules/react-native/sections/why.mdx" },
    { slug: "mental-model",    title: "Bridge vs new architecture", kind: "concept", estMinutes: 12, bodyMdxPath: "modules/react-native/sections/mental-model.mdx" },
    { slug: "expo-vs-bare",    title: "Expo vs bare workflow",   kind: "pattern",    estMinutes: 11, bodyMdxPath: "modules/react-native/sections/expo-vs-bare.mdx" },
    { slug: "navigation",      title: "Navigation primer",       kind: "concept",    estMinutes: 10, bodyMdxPath: "modules/react-native/sections/navigation.mdx" },
    { slug: "native-modules",  title: "Native modules",          kind: "concept",    estMinutes: 10, bodyMdxPath: "modules/react-native/sections/native-modules.mdx" },
    { slug: "tradeoffs",       title: "Tradeoffs",               kind: "tradeoff",   estMinutes: 9,  bodyMdxPath: "modules/react-native/sections/tradeoffs.mdx" },
    { slug: "gotchas",         title: "Production gotchas",      kind: "gotcha",     estMinutes: 10, bodyMdxPath: "modules/react-native/sections/gotchas.mdx" },
    { slug: "quiz",            title: "Self-check",              kind: "quiz",       estMinutes: 6,  bodyMdxPath: "modules/react-native/sections/quiz.mdx" },
    { slug: "cheatsheet",      title: "Cheatsheet",              kind: "cheatsheet", estMinutes: 4,  bodyMdxPath: "modules/react-native/sections/cheatsheet.mdx" },
  ],
};
