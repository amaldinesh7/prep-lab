import { useEffect, useState } from "react";

export type Theme = "light" | "dark";
const STORAGE_KEY = "prep-lab:theme";

export function resolveInitialTheme(args: { stored: Theme | null; systemPrefersDark: boolean }): Theme {
  if (args.stored) return args.stored;
  return args.systemPrefersDark ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const sys = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return resolveInitialTheme({ stored, systemPrefersDark: sys });
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return { theme, setTheme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}
