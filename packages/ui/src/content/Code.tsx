import type { ReactNode } from "react";

export function Code({ lang, file, children }: { lang?: string; file?: string; children: ReactNode }) {
  return (
    <pre className="relative my-5 max-w-[64ch] bg-[var(--surface)] border border-[var(--border)] px-5.5 py-4.5 text-[13px] leading-[1.7] overflow-x-auto">
      {(lang || file) && (
        <span className="absolute -top-px -left-px bg-[var(--text)] text-[var(--paper)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest">
          {file ?? lang}
        </span>
      )}
      <code className={`block ${lang || file ? "mt-4" : ""}`}>{children}</code>
    </pre>
  );
}
