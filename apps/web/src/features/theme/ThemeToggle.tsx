import { useTheme } from "./useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="w-7 h-7 rounded-full border border-[var(--border)] bg-[var(--paper)] text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)] flex items-center justify-center text-[13px]"
    >◐</button>
  );
}
