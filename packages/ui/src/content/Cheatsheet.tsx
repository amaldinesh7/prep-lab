export function Cheatsheet({ rows }: { rows: { k: string; v: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 max-w-[64ch] my-3">
      {rows.map((r) => (
        <div key={r.k} className="bg-[var(--violet-bg)] border border-[var(--violet-soft)] p-3.5">
          <div className="font-mono text-[11px] text-[var(--violet)] uppercase tracking-wider mb-1">{r.k}</div>
          <div className="text-[13px]">{r.v}</div>
        </div>
      ))}
    </div>
  );
}
